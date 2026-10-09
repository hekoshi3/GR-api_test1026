import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch('/api/v1/proxy/getStateInstance')

        const body: {stateInstance: string} = await res.json()
        if (body.stateInstance === "authorized") return res
        else return NextResponse.json({ error: "Intance not found" }, { status: 500 });
    } catch (e) {
        console.error("Account check API error:", e)
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}