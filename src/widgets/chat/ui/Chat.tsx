import { Message } from "@/src/entities/chat-message";
import { useEffect, useRef, useState } from "react";
import { ChatMessageProps } from "@/src/entities/chat-message/model/message";
import { ContactInfoType } from "@/src/entities/contact";

export function Chat({ chatHistory }: { chatHistory: ChatMessageProps[] }) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    return (
        <>
            {chatHistory ? (chatHistory.map((message) => (
                <div key={message.idMessage} className={`flex ${message.type === "outgoing" ? "justify-end" : ""} w-full`}>
                    <div className="max-w-3/4 min-w-0">
                        {(message.typeMessage === "textMessage" || message.typeMessage === "extendedTextMessage")
                            ? <Message textMessage={message.textMessage} isSender={message.type === "outgoing"} /> :
                            <Message textMessage={"<<Image input>>"} isSender={message.type === "outgoing"} />}
                    </div>
                </div>
            )
            )) : <></>}
            <div ref={bottomRef} />
        </>
    )
}