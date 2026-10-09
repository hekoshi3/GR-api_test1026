"use client"

import { ChatUnit } from "@/src/entities/chat-unit-aside";
import { Search } from "./search/Search";
import { usePathname } from "next/navigation";

export function ChatList() {
    const pathname = usePathname()
    const chats: ChatUnitType[] = []
    return (
        <aside className="max-w-99 border-r border-l border-border min-h-screen bg-chat-list-bg">
            <div className="flex flex-row justify-between pt-4 pb-4 px-4.5">
                <span className="text-2xl font-bold">Chats</span>
            </div>
            <div className="flex flex-col justify-center items-center">
                <Search />
                <div className="w-99 pt-2">
                    {chats.length > 0 ? chats.map((chat) => (
                        <ChatUnit key={chat.chatId} chat={chat} active={"/" + chat.chatId === pathname} />
                    )) : <></>}
                </div>
            </div>
        </aside>
    );
}