import { Icon_Attachment } from "@/src/shared/ui/icons";
import { SubmitMessage } from "../model/submit-message";
import { ChatMessageProps } from "@/src/entities/chat-message/model/message";

export function ChatInput({ chatId, onSent }: { chatId: string; onSent: (msg: ChatMessageProps) => void }) {

    const handleFormAction = async (formData: FormData) => {
        const textMessage = formData.get("textMessage") as string;
        const optimisticMessage: ChatMessageProps = {
            type: "outgoing",
            idMessage: Date.now().toString(),
            timestamp: Date.now(),
            typeMessage: "extendedTextMessage",
            chatId: chatId,
            chatType: "user",
            textMessage: textMessage,
            extendedTextMessage: {
                text: "",
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
        }
        onSent(optimisticMessage)

        try {
            const body = await SubmitMessage({ textMessage: optimisticMessage.textMessage, chatId });
        } catch (e) {
            return
        }

    };
    return (
        <form action={handleFormAction} className="bg-chat-list-bg shadow-xl flex px-4 py-2 rounded-xl justify-center items-center">
            <button type="button" className="text-white/50 hover:bg-black/20 cursor-pointer rounded-3xl w-8 "><Icon_Attachment className="p-1" /></button>
            <input type="text" id="textMessage" name="textMessage" placeholder="Message" className="w-full px-2 focus:outline-0" />
            <button type="submit" className=""></button>
        </form>
    )
}