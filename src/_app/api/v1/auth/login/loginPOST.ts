import { NextRequest, NextResponse } from "next/server";

export async function loginPOST(request: NextRequest) {
    const { idInstance, apiTokenInstance } = await request.json()

    const res: NextResponse = NextResponse.json({ success: true })

    res.cookies.set('auth_session', JSON.stringify({ idInstance, apiTokenInstance }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    })

    return res
}