export type ChatMessageProps = {
    type: string,
    idMessage: string,
    timestamp: number,
    typeMessage: string,
    chatId: string,
    chatType: string,
    textMessage: string,
    extendedTextMessage: {
        text: string,
        description: string,
        title: string,
        previewType: string,
        jpegThumbnail: string,
        forwardingScore: number,
        isForwarded: boolean
    },
    statusMessage: boolean,
    sendByApi: boolean,
    deletedMessageId: number,
    editedMessageId: number,
    isEdited: boolean,
    isDeleted: boolean,
    jpegThumbnail: string
}
