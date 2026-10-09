import { ChatMessageProps } from "../model/message";

export function Message({ textMessage, isSender }: { textMessage: string; isSender: boolean }) {
    const style = isSender ?
        "bg-linear-to-r from-indigo-600 to-purple-600 "
        :
        "bg-linear-to-r from-neutral-800 to-neutral-700";
    return (
        <span
            className={`inline-block rounded-2xl my-px py-2 pr-5 pl-2
                max-w-full wrap-break-word whitespace-pre-wrap
                ${style}`}
        >
            {textMessage}
        </span>
    );
}