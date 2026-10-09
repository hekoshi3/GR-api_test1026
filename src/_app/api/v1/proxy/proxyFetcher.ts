import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function proxyFetcher(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    try {
        const BASE_URL = process.env.API
        const cookieStore = await cookies();
        const authSession = cookieStore.get('auth_session')?.value;

        if (!authSession) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { idInstance, apiTokenInstance } = JSON.parse(authSession);
        const { path } = await params

        const endpoint = path[0]
        const id = path.slice(1).join()
        const url = `${BASE_URL}/waInstance${idInstance}/${endpoint}/${apiTokenInstance}${id === "" ? id : "/" + id}`

        const headers = new Headers(request.headers);

        if (request.body) {
            headers.set("Content-Type", "application/json");
        }

        const fetchOptions: RequestInit & { duplex?: string } = {
            method: request.method,
            headers: headers,
            ...(request.method !== "GET" && request.method !== "HEAD" ? { body: request.body, duplex: "half" } : {})
        };

        const res = await fetch(url, fetchOptions);
        const text = await res.text()

        let data;
        try {
            data = JSON.parse(text)
        } catch {
            return NextResponse.json(
                { body: null, error: 'Invalid JSON', raw: text },
                { status: 502 }
            );
        }

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return NextResponse.json(
                {
                    error: errorData.message
                },
                { status: res.status }
            )
        }
        const nextResponse = NextResponse.json(data, { status: res.status })
        return nextResponse;
    } catch (error) {
        console.error("API fetcher error:", error)
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
