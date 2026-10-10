import Image from "next/image";

export const Contacts_btn = () => {
    return (
        <button className="cursor-pointer h-16 w-16 min-w-10.5 px-0.5 py-2 flex flex-col justify-center items-center">
            <img src={"/icons/contacts_icon_inactive.png"} width={24} height={24} alt="contacts"></img>
            <span className="text-xs h-4 w-16 text-white/50">Contacts</span>
        </button>
    );
}

export const Calls_btn = () => {
    return (
        <button className="cursor-pointer h-16 w-16 px-0.5 py-2 flex flex-col justify-center items-center">
            <img src={"/icons/calls_icon_inactive.png"} width={24} height={24} alt="calls"></img>
            <span className="text-xs h-4 w-16 text-white/50">Calls</span>
        </button>
    );
}