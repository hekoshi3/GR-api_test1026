import Image from "next/image";

export const ActionBtn = () => {
    return (
        <button className="cursor-pointer bg-accent w-8 h-8 flex items-center justify-center rounded-2xl">
            <Image src={'/icons/actions_plus.svg'} width={24} height={24} alt=""></Image>
        </button>
    );
}