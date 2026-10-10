import Image from "next/image";

export const AllChats_btn = () => {
    return (
        <button className="cursor-pointer h-16 w-16 px-0.5 py-2 flex flex-col justify-center items-center ">
            <img src={"/icons/chat_all_icon.png"} width={24} height={24} alt="all"></img>
            <span className="text-xs h-4 w-16">All</span>
        </button>
    );
}

export const UnreadChats_btn = () => {
    return (
        <button className="cursor-pointer h-16 w-16 px-0.5 py-2 flex flex-col justify-center items-center">
            <img src={"/icons/chat_unread_icon_inactive.png"} width={24} height={24} alt="unread"></img>
            <span className="text-xs text-white/50">New</span>
        </button>
    );
}

export const ChannelsChats_btn = () => {
    return (
        <button className="cursor-pointer h-16 w-16 px-0.5 py-2 flex flex-col justify-center items-center">
            <img src={"/icons/chat_channels_icon_inactive.png"} width={24} height={24} alt="channels"></img>
            <span className="text-xs text-white/50">Channels</span>
        </button>
    );
}