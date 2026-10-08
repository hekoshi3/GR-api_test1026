import { ChatList } from "@/src/widgets/chat-list-aside";
import { SideNav } from "@/src/widgets/side-nav"

export function Main() {
    return (
        <div className="flex flex-row">
            <SideNav />
            <ChatList />

            <main className="bg-chat-bg w-screen">

            </main>
        </div>
    );
}