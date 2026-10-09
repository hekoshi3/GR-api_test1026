import { NextRequest, NextResponse } from "next/server";

export async function loginPOST(request: NextRequest) {
    const { idInstance, apiTokenInstance } = await request.json()

    const stateRes = await fetch(
        `${process.env.API}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
    );

    if (!stateRes.ok) {
        return NextResponse.json(
            { error: "Instance not found" },
            { status: 401 }
        );
    }

    const state = await stateRes.json();

    if (state.stateInstance !== "authorized") {
        return NextResponse.json(
            { error: `Instance ${state.stateInstance}` },
            { status: 401 }
        );
    }

    const res: NextResponse = NextResponse.json({ success: true })

    res.cookies.set('auth_session', JSON.stringify({ idInstance, apiTokenInstance }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    })

    return res
}