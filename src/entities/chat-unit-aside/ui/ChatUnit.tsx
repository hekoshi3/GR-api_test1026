import { IconStatus_delivered, IconStatus_read } from "@/src/shared/ui/icons";
import Image from "next/image";
import Link from "next/link";

export function ChatUnit({ chat, active }: { chat: ChatUnitType; active: boolean }) {
    return (
        <Link className={`cursor-pointer w-full h-20 grid grid-cols-5 px-4 items-center text-left ${active ? "bg-chat-list-select-bg" : ""} hover:bg-chat-list-select-bg/60`} href={`/${chat.chatId}`}>
            <div className="h-16 w-16 row-span-2 col-end-1 p-1 mr-4">
                {chat.avatar ?
                    <Image
                        src={chat.avatar}
                        width={64}
                        height={64}
                        alt="avatar"
                        className={`rounded-4xl`}>
                    </Image> :
                    <div
                        className={`flex
                            justify-center
                            items-center
                            bg-accent
                            rounded-4xl
                            h-full`}>
                        <span className="text-2xl mb-1 select-none">
                            {chat.name[0]}
                        </span>
                    </div>
                }
            </div>
            <h3 className="truncate col-start-1 col-end-4 font-semibold">{chat.name}</h3>
            <div className="flex justify-end gap-2 col-start-4 col-end-6">
                {chat.statusMessage === "delivered" ? <IconStatus_delivered color="#007AFF" className="w-4 h-auto" /> : <IconStatus_read color="#007AFF" className="w-4 h-auto" />}
                <span className="text-white/80 text-sm">{chat.time}</span>

            </div>
            <span className="truncate text-white/80 col-start-1 col-end-5 items-center">{chat.message}</span>
            {chat.unreadCount === 0 ? <></> :
                <div className="bg-accent w-5 h-5 ml-auto rounded-4xl text-center text-sm font-semibold">
                    <span className="">{chat.unreadCount}</span>
                </div>
            }
        </Link>
    );
}