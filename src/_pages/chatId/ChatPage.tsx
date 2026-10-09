"use client"

import { ChatHeader } from "@/src/entities/chat-header";
import { ChatMessageProps } from "@/src/entities/chat-message/model/message";
import { ContactInfoType } from "@/src/entities/contact";
import { NotificationHandling } from "@/src/features/notifications";
import { IncomingNotificationType } from "@/src/features/notifications/model/notification";
import { Chat } from "@/src/widgets/chat";
import { ChatInput } from "@/src/widgets/chat";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function ChatPage() {
    const params = useParams();
    const chatId = params?.id as string;

    const [contactInfo, setContactInfo] = useState<ContactInfoType>()
    const [chatHistory, setChatHistory] = useState<ChatMessageProps[]>([])

    useEffect(() => {
        if (!chatId) return
        const abortController = new AbortController();

        async function fetchContactAccount() {
            try {
                const res = await fetch('/api/v1/proxy/getContactInfo', {
                    method: 'POST',
                    body: JSON.stringify({ "chatId": chatId }),
                    signal: abortController.signal
                })
                if (!res.ok) {
                    return new Error(JSON.stringify(res))
                }
                const body: ContactInfoType = await res.json()
                setContactInfo(body)
            } catch (e) {
                if ((e as Error).name !== 'AbortError') {
                    console.error(e)
                }
            }
        }

        fetchContactAccount()
        return () => {
            abortController.abort();
        };
    }, [chatId])

    useEffect(() => {
        if (!chatId) return

        const abortController = new AbortController();
        async function fetchCurrentChat() {
            try {
                const res = await fetch('/api/v1/proxy/getChatHistory', {
                    method: 'POST',
                    body: JSON.stringify({
                        "chatId": chatId,
                        "count": 10
                    }),
                    signal: abortController.signal
                })
                if (!res.ok) {
                    throw new Error(`API Error: ${res.status}`);
                }
                const body: ChatMessageProps[] = await res.json()
                setChatHistory(body.reverse())
            } catch (e) {
                if ((e as Error).name !== 'AbortError') {
                    console.error(e)
                }
            }
        }

        fetchCurrentChat()

        return () => {
            abortController.abort();
        };
    }, [chatId])

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await NotificationHandling()
                if (!res.ok) return

                const notification: IncomingNotificationType = await res.json()
                if (notification.status === "no_notifications") return
                if (notification && notification.body.typeWebhook) {
                    const incomingMessage = notification.body.messageData.textMessageData.textMessage
                    const typeMessage = notification.body.messageData.typeMessage
                    const notifChatId = notification.body.senderData.chatId
                    const idMessage = notification.body.idMessage
                    const typeWebhook = notification.body.typeWebhook
                    const date = notification.body.timestamp

                    const typeIncoming = typeWebhook.includes('incoming') ? "incoming" : "outgoing"

                    if (chatId === notifChatId) {
                        setChatHistory(prev => {
                            if (prev.some(m => m.idMessage === idMessage)) return prev
                            return [...prev, {
                                type: typeIncoming,
                                idMessage: idMessage,
                                timestamp: date,
                                typeMessage: typeMessage,
                                chatId: notifChatId,
                                chatType: "user",
                                textMessage: incomingMessage,
                                extendedTextMessage: {
                                    text: incomingMessage,
                                    description: "",
                                    title: "",
                                    previewType: "",
                                    jpegThumbnail: "",
                                    forwardingScore: 0,
                                    isForwarded: false
                                },
                                statusMessage: false,
                                sendByApi: false,
                                deletedMessageId: 0,
                                editedMessageId: 0,
                                isEdited: false,
                                isDeleted: false,
                                jpegThumbnail: ""
                            }]
                        })

                    }
                }
                else return
            } catch (e) {
                console.error('Polling error: ', e)
            }
        }, 5000)

        return () => clearTimeout(interval)
    }, [chatId])

    const handleSent = (msg: ChatMessageProps) => {
        setChatHistory(prev => [...prev, msg])
    };

    return (
        <div className="flex flex-col overflow-hidden min-w-0 w-full h-screen">
            <ChatHeader
                avatar={contactInfo?.avatar ?? null}
                chatName={contactInfo?.contactName ?? chatId} />
            <div className="flex flex-col min-w-0 max-w-3xl w-full mx-auto flex-1 min-h-0 mt-2 px-2">
                <div className="flex-1 min-h-0 min-w-0 overflow-y-auto mb-5 flex flex-col scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <div className="mt-auto min-w-0 ">
                        <Chat chatHistory={chatHistory} />
                    </div>
                </div>
                <div className="shrink-0 pb-5 min-w-0 ">
                    <ChatInput chatId={chatId} onSent={handleSent} />
                </div>
            </div>
        </div>
    );
}