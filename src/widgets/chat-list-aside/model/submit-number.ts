import { NextResponse } from "next/server"

export type AccountCheck = {
    exist: boolean,
    chatId?: string,
    fromCache?: boolean
}

export async function SubmitTel(tel: number) {
    try {
        const res = await fetch('/api/v1/proxy/checkAccount', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "phoneNumber": tel })
        })
        if (res.ok) {
            const body: AccountCheck = await res.json()
            if (body.exist) {
                return body
            }
        }
        return { exist: false }
    } catch (e) {
        throw new Error("API Error: " + e)
    }
}