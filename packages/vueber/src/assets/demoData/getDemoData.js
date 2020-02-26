export default function getDemoData() {
  const avatar1 = require('./user1.jpeg')
  const avatar2 = require('./user2.jpeg')
  const avatar3 = require('./user3.jpeg')
  const avatar4 = require('./user4.jpeg')
  const avatar5 = require('./user5.jpeg')
  return {
    conversations: [
      {
        lastMessage: {
          hasPendingNotification: true,
          isRead: false,
          message: "Hello, I'm User 1",
          senderId: 'user1',
          senderName: 'User 1',
          sentDate: new Date('2019-11-21T08:50:57.796Z'),
          _ownMessage: false
        },
        noOfMessages: 13,
        participants: {
          user1: {
            avatarPath: avatar1,
            chatDisabled: false,
            id: 'user1',
            username: 'User 1'
          },
          user2: {
            avatarPath: avatar2,
            chatDisabled: false,
            id: 'user2',
            username: 'User 2'
          }
        },
        participantsArray: ['user1', 'user2'],
        id: 'conversation1'
        // path: 'conversations/conversation1',
        // _chatpartner: {
        //   avatarPath: null,
        //   chatDisabled: false,
        //   id: 'user1',
        //   username: 'User1'
        // }
      },
      {
        lastMessage: {
          hasPendingNotification: false,
          isRead: true,
          message: "Hey it's User 3.",
          senderId: 'user3',
          senderName: 'User 3',
          sentDate: new Date('2019-11-20T08:50:57.796Z'),
          _ownMessage: false
        },
        noOfMessages: 3,
        participants: {
          user1: {
            avatarPath: avatar1,
            chatDisabled: false,
            id: 'user1',
            username: 'User 1'
          },
          user3: {
            avatarPath: avatar3,
            chatDisabled: false,
            id: 'user3',
            username: 'User 3'
          }
        },
        participantsArray: ['user1', 'user3'],
        id: 'conversation2'
        // path: 'conversations/conversation2',
        // _chatpartner: {
        //   avatarPath: null,
        //   chatDisabled: false,
        //   id: 'user1',
        //   username: 'User1'
        // }
      },
      {
        lastMessage: {
          hasPendingNotification: false,
          isRead: true,
          message: "Hey it's User 4.",
          senderId: 'user4',
          senderName: 'User 4',
          sentDate: new Date('2019-11-20T08:50:57.796Z'),
          _ownMessage: false
        },
        noOfMessages: 3,
        participants: {
          user1: {
            avatarPath: avatar1,
            chatDisabled: false,
            id: 'user1',
            username: 'User 1'
          },
          user4: {
            avatarPath: avatar4,
            chatDisabled: false,
            id: 'user4',
            username: 'User 4'
          }
        },
        participantsArray: ['user1', 'user4'],
        id: 'conversation3'
        // path: 'conversations/conversation3',
        // _chatpartner: {
        //   avatarPath: null,
        //   chatDisabled: false,
        //   id: 'user1',
        //   username: 'User1'
        // }
      },
      {
        lastMessage: {
          hasPendingNotification: false,
          isRead: true,
          message: "Hey it's User 5.",
          senderId: 'user5',
          senderName: 'User 5',
          sentDate: new Date('2019-11-20T08:50:57.796Z'),
          _ownMessage: false
        },
        noOfMessages: 3,
        participants: {
          user1: {
            avatarPath: avatar1,
            chatDisabled: false,
            id: 'user1',
            username: 'User 1'
          },
          user5: {
            avatarPath: avatar5,
            chatDisabled: false,
            id: 'user5',
            username: 'User 5'
          }
        },
        participantsArray: ['user1', 'user5'],
        id: 'conversation4'
        // path: 'conversations/conversation4',
        // _chatpartner: {
        //   avatarPath: null,
        //   chatDisabled: false,
        //   id: 'user5',
        //   username: 'User 5'
        // }
      }
    ],
    users: [
      {
        id: 'user1',
        avatar: avatar1,
        username: 'User1'
      },
      {
        id: 'user2',
        avatar: avatar2,
        username: 'User2'
      },
      {
        id: 'user3',
        avatar: avatar3,
        username: 'User3'
      }
    ],
    messages: [
      {
        hasPendingNotification: true,
        isRead: true,
        message: 'Hallo, dies ist ein Test',
        senderId: 'user2',
        senderName: 'User2',
        sentDate: new Date('2019-01-07T10:36:38.296Z'),
        id: 'message1',
        conversationId: 'conversation1'
      },
      {
        hasPendingNotification: true,
        isRead: true,
        message: 'Testchat',
        senderId: 'user2',
        senderName: 'User2',
        sentDate: new Date('2019-01-07T10:36:38.296Z'),
        id: 'message2',
        conversationId: 'conversation2'
      }
    ]
  }
}
