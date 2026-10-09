"use client"

import { useRouter } from "next/navigation";
import { SubmitAuth } from "../model/submit-auth";
import { useState } from "react";

export function AuthForm() {
    const router = useRouter()
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFormAction = async (formData: FormData) => {
        setError('')

        const idInstance = formData.get("idInstance") as string;
        const apiTokenInstance = formData.get("apiTokenInstance") as string;

        if (!idInstance.trim() || !apiTokenInstance.trim()) { setError("Both fields must be filled in"); return; }

        setLoading(true)
        try {
            const res = await SubmitAuth({ idInstance, apiTokenInstance });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error ?? `Error: ${res.status}`);
            }

            router.push('/')
            router.refresh()
        } catch (e) {
            setError((e as Error).message)
        } finally {
            setLoading(false)
        }

    };
    return (
        <div className="bg-chat-list-bg rounded-xl flex flex-col justify-between border border-border">
            <div className="flex justify-center mt-4 mx-8 text-center text-2xl"><h1>Log in using instance id and token</h1></div>
            <form className="flex flex-col justify-between pb-5" action={handleFormAction}>
                <div className="flex flex-col gap-5 mt-24">
                    <input type="text" placeholder="idInstance" name="idInstance" id="idInstance" className="h-12 bg-black/30 rounded-xl px-5 text-xl mx-8 focus:outline-0" />
                    <input type="password" placeholder="apiTokenInstance" name="apiTokenInstance" id="apiTokenInstance" className="h-12 bg-black/30 rounded-xl px-5 mx-8 text-xl focus:outline-0" />
                </div>
                <button type="submit" className="h-12 mx-auto px-10 bg-black/40 rounded-xl mt-10 text-xl font-semibold cursor-pointer hover:bg-black/50">{loading ? "Loading" : "Submit"}</button>
            </form>
            {error && <div className="pb-5 flex justify-center"><span className="text-red-500 wrap-break-word">{error.slice(0, 50)}</span></div>}
        </div>
    )
}