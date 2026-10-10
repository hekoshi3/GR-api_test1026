'use client'

import Image from "next/image"

export const SignOutBtn = () => {
    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/v1/auth/logout', { method: "POST" })
            if (!res.ok) {
                throw new Error(`Logout failed: ${res.status}`);
            }
            window.location.href = '/auth'
        }
        catch (e) {
            console.error(e);
        }
    }
    return (
        <button className="cursor-pointer h-16 w-16 flex flex-col justify-center items-center" onClick={handleSignOut}>
            <img src={"/icons/settings_icon_inactive.png"} width={24} height={24} alt="settings"></img>
            <span className="text-xs h-4 w-16 text-white/50">Sign out</span>
        </button>
    );
}