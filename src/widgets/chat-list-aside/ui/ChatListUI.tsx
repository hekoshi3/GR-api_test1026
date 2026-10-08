import { ActionBtn } from "./buttons/action_button";
import { Search } from "./search/Search";

export function ChatList() {
    return (
        <aside className="max-w-99 border-r border-l border-border min-h-screen bg-chat-list-bg">
            <div className="flex flex-row justify-between pt-4 pb-4 px-4.5">
                <span className="text-2xl font-bold">Chats</span>
                <ActionBtn />
            </div>
            <div className="flex flex-col justify-center items-center">
                <Search />
                <div className="w-99 pt-2 h-100"></div>
            </div>

        </aside>
    );
}