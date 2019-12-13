export const serializeConversation = (currentUserId) => {
  return (doc) => {
    const conversation = doc.data()
    conversation.id = doc.id

    // Create Date Object
    if (conversation.lastMessage.sentDate) {
      conversation.lastMessage.sentDate = conversation.lastMessage.sentDate.toDate()
    }

    // Delete Own Participant
    delete conversation.participants[currentUserId]

    // Add _chatpartner
    let chatpartner
    for (const i in conversation.participants) {
      chatpartner = conversation.participants[i]
      break
    }
    conversation._chatpartner = chatpartner

    // Set _ownMessage Flag
    const isOwnMessage = conversation.lastMessage.senderId === currentUserId
    conversation.lastMessage._ownMessage = isOwnMessage

    return conversation
  }
}

export const serializeMessage = (doc) => {
  const message = doc.data()
  message.id = doc.id
  message.sentDate = message.sentDate.toDate()
  return message
}
