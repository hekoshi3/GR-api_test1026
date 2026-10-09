"use client"

import { Icon_ArrowLeft } from "@/src/shared/ui/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ChatHeader({ avatar, chatName }: { avatar: string | null, chatName: string }) {
    const router = useRouter()
    return (
        <div className="h-16.5 w-full bg-chat-list-bg border-b border-border flex flex-row justify-between items-center">
            <div className="flex flex-row gap-5 mx-5 items-center">
                <button className="p-2 hover:bg-black/20 rounded-4xl cursor-pointer" type="button" onClick={() => router.replace('/')}><Icon_ArrowLeft width={24} /></button>
                <div className="grid w-10 h-10">
                    {avatar ?
                        <Image
                            src={avatar}
                            width={64}
                            height={64}
                            alt="avatar"
                            className={`rounded-4xl w-10 h-10`}>
                        </Image> :
                        <div
                            className={`flex
                            justify-center
                            items-center
                            bg-accent
                            rounded-4xl`}>
                            <span className="text-2xl mb-0.5 select-none">
                                {chatName[0]}
                            </span>
                        </div>
                    }
                </div>
                <span className="font-semibold text-xl">
                    {chatName}
                </span>
            </div>

        </div>
    );
}