import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function logoutPOST() {
    const cookieStore = await cookies();
    cookieStore.delete("auth_session");
    const res: NextResponse = NextResponse.json({ success: true })

    return res
}