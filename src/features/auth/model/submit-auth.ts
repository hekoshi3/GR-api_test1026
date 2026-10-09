import { AuthType } from "./Auth";

export async function SubmitAuth({ idInstance, apiTokenInstance }: AuthType) {
    const loginRes = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idInstance, apiTokenInstance })
    })
    return loginRes
}