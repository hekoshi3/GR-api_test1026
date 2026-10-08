import { ChatUnit } from "@/src/entities/chat-unit-aside";
import { ActionBtn } from "./buttons/action_button";
import { Search } from "./search/Search";

export function ChatList({ chats }: { chats: ChatUnitType[] }) {
    const date = new Date()
    const time = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })
    if (!chats) chats = [{
        chatId: "0",
        avatar: '/test/avatar/V7NMmYtntN.png',
        name: "teskml;gsfkml;afjklsjkljklsgkljsdgsfklt",
        message: "hi",
        time: time,
        statusMessage: "delivered",
        unreadCount: 0
    }, {
        chatId: "5",
        avatar: '/test/avatar/explorer_FWN9ZHqZQS.png',
        name: "test1",
        message: "hi",
        time: time,
        statusMessage: "read",
        unreadCount: 5
    }, {
        chatId: "1",
        avatar: '/test/avatar/test_avatar.png',
        name: "test1",
        message: "hi",
        time: time,
        statusMessage: "delivered",
        unreadCount: 0
    }, {
        chatId: "2",
        avatar: '/test/avatar/test_avatar.png',
        name: "test1test1test1test1test1test1test1test1test1",
        message: "hi",
        time: time,
        statusMessage: "read",
        unreadCount: 0
    }, {
        chatId: "3",
        avatar: '/test/avatar/test_avatar.png',
        name: "1",
        message: "test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1",
        time: time,
        statusMessage: "read",
        unreadCount: 0
    },]
    return (
        <aside className="max-w-99 border-r border-l border-border min-h-screen bg-chat-list-bg">
            <div className="flex flex-row justify-between pt-4 pb-4 px-4.5">
                <span className="text-2xl font-bold">Chats</span>
                <ActionBtn />
            </div>
            <div className="flex flex-col justify-center items-center">
                <Search />
                <div className="w-99 pt-2 h-100">
                    {chats.map((chat) => (
                        <ChatUnit key={chat.chatId} chat={chat} />
                    ))}
                </div>
            </div>
        </aside>
    );
}