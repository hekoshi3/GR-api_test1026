import { NextResponse } from "next/server";
import { IncomingNotificationType } from "../model/notification";

export async function NotificationHandling() {
    try {
        const receiveRes = await fetch("/api/v1/proxy/receiveNotification")
        if (!receiveRes.ok) {
            return NextResponse.json({ error: 'Receive failed' }, { status: receiveRes.status });
        }

        const text = await receiveRes.text()

        if (!text || text === 'null' || text.trim() === '') {
            return NextResponse.json({ status: 'no_notifications' });
        }

        let notification: IncomingNotificationType;
        try {
            notification = JSON.parse(text)
        }
        catch (e) {
            console.error('failed to parse notification:', text)
            return NextResponse.json({ error: 'Invalid JSON' }, { status: 500 });
        }

        const typeWebhook = notification.body.typeWebhook
        if (notification.receiptId && typeWebhook) {
            const deleteRes = await fetch("/api/v1/proxy/deleteNotification/" + notification.receiptId,
                {
                    method: 'DELETE',
                })
            if (!deleteRes.ok) {
                console.error('Failed to delete notification: ', notification.receiptId, deleteRes.statusText);
            }
        }
        if (notification.status !== "empty") return NextResponse.json(notification)
        else return NextResponse.json({ status: 'no_notifications' });
    }
    catch (e) {
        console.error("Notification error:", e)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}