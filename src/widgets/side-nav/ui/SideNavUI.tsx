import { AllChats_btn, UnreadChats_btn, ChannelsChats_btn } from "./buttons/chats/chats_buttons";
import { Contacts_btn, Calls_btn } from "./buttons/buttons";
import { SignOutBtn } from "./buttons/sign_out";

export function SideNav() {
    return (
        <nav className="w-19 min-h-screen bg-chat-list-bg">
            <div className="px-1 h-screen flex flex-col justify-between">
                <div className="justify-center items-center mx-1">
                    <ul className="flex flex-col gap-0.5 pt-5 pb-4.5 justify-center items-center">
                        <li><AllChats_btn /></li>
                        <li><UnreadChats_btn /></li>
                        <li><ChannelsChats_btn /></li>
                    </ul>
                    <div className="bg-white/12 w-15 h-px mx-auto"></div>
                    <ul className="flex flex-col gap-0.5 pt-2 pb-4.5 justify-center items-center">
                        <li><Contacts_btn /></li>
                        <li><Calls_btn /></li>
                    </ul>
                </div>
                <div className="flex pb-3.5 justify-center items-center">
                    <SignOutBtn />
                </div>
            </div>

        </nav>
    );
}