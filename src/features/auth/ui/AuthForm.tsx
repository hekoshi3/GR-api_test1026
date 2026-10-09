"use client"
import { useRouter } from "next/navigation";
import { SubmitAuth } from "../model/submit-auth";

export function AuthForm() {
    const router = useRouter()
    const handleFormAction = async (formData: FormData) => {
        const idInstance = formData.get("idInstance") as string;
        const apiTokenInstance = formData.get("apiTokenInstance") as string;
        const res = await SubmitAuth({ idInstance, apiTokenInstance });
        if (!res.ok) {
            throw new Error(`Login failed: ${res.status}`);
        }
        router.push('/')
    };
    return (
        <div className="bg-chat-list-bg h-1/2 w-1/4 rounded-xl flex flex-col justify-between border border-border">
            <div className="flex justify-center mt-10 text-2xl"><h1>Log in using instance id and token</h1></div>
            <form className="flex flex-col h-full justify-between" action={handleFormAction}>
                <div className="flex flex-col gap-5 mt-24">
                    <input type="password" placeholder="idInstance" name="idInstance" id="idInstance" className="h-12 bg-black/30 rounded-xl px-5 text-xl mx-8 focus:outline-0" />
                    <input type="password" placeholder="apiTokenInstance" name="apiTokenInstance" id="apiTokenInstance" className="h-12 bg-black/30 rounded-xl px-5 mx-8 text-xl focus:outline-0" />
                </div>
                <button type="submit" className="h-12 mx-16 bg-black/40 rounded-xl mb-10 text-xl font-semibold cursor-pointer hover:bg-black/50">Submit</button>
            </form>
        </div>
    )
}