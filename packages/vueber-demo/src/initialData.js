export function getInitialConversations() {
  return [
    {
      lastMessage: {
        hasPendingNotification: true,
        isRead: false,
        message: "Hello, I'm User 1",
        senderId: 'user1',
        senderName: 'User1',
        sentDate: '2019-11-21T08:50:57.796Z',
        _ownMessage: false
      },
      noOfMessages: 13,
      participants: {
        user1: {
          avatarPath: require('./../assets/user2.jpeg'),
          chatDisabled: false,
          id: 'user1',
          username: 'User1'
        }
      },
      participantsArray: ['user0', 'user1'],
      id: 'conversation1',
      path: 'conversations/conversation1',
      _chatpartner: {
        avatarPath: null,
        chatDisabled: false,
        id: 'user1',
        username: 'User1'
      }
    },
    {
      lastMessage: {
        hasPendingNotification: false,
        isRead: true,
        message: "Hey there's user 2.",
        senderId: 'user2',
        senderName: 'User2',
        sentDate: '2019-11-20T08:50:57.796Z',
        _ownMessage: false
      },
      noOfMessages: 3,
      participants: {
        user2: {
          avatarPath: require('./../assets/user2.jpeg'),
          chatDisabled: false,
          id: 'user2',
          username: 'User2'
        }
      },
      participantsArray: ['user2', 'user0'],
      id: 'conversation2',
      path: 'conversations/conversation2',
      _chatpartner: {
        avatarPath: null,
        chatDisabled: false,
        id: 'user2',
        username: 'User2'
      }
    }
  ]
}

export function getInitialUsers() {
  return [
    {
      id: 'user1',
      avatar: require('./../assets/user2.jpeg'),
      username: 'User1'
    },
    {
      id: 'user2',
      avatar: require('./../assets/user2.jpeg'),
      username: 'User2'
    },
    {
      id: 'user3',
      avatar: require('./../assets/user2.jpeg'),
      username: 'User3'
    }
  ]
}

export function getInitialMessages() {
  return [
    {
      hasPendingNotification: true,
      isRead: true,
      message: 'Hallo, dies ist ein Test',
      senderId: 'user2',
      senderName: 'User2',
      sentDate: '2019-01-07T10:36:38.296Z',
      id: 'message1',
      conversationId: 'conversation1'
    },
    {
      hasPendingNotification: true,
      isRead: true,
      message: 'Testchat',
      senderId: 'user2',
      senderName: 'User2',
      sentDate: '2019-01-07T10:36:38.296Z',
      id: 'message2',
      conversationId: 'conversation2'
    }
  ]
}
