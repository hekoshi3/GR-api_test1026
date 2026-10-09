export type MessageSubmitType = {
    chatId: string,
    textMessage: string,
    quotedMessageId?: string
}

export async function SubmitMessage(message: MessageSubmitType) {
    try {
        const res = await fetch('/api/v1/proxy/sendMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatId: message.chatId, message: message.textMessage })
        })
        if (res.ok) {
            const body: string = await res.json()
            if (body) {
                return body
            }
        }
        return false
    } catch (e) {
        throw new Error("API Error: " + e)
    }
}