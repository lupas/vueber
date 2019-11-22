<template>
  <div class="fullHeight">
  <vueber
    :current-user="currentUser"
    :conversations="conversations"
    :messages="messages"
    :has-more-conversations="hasMoreConversations"
    :has-more-messages="hasMoreMessages"
    :user-actions="userActions"
    @loadMoreConversations="loadNextConversations"
    @loadMoreMessages="loadMoreMessages"
    @messagePosted="postMessage"
    @conversationSelected="handleSelectedConversation"
  />
  </div>
</template>

<script>
export default {
  name: 'app',
   components: {
    vueber: () => import('vueber')
  },
  data: () =>  ({
    currentUser: { "id": "user1", "avatar": "https://www.googleapis.com/download/storage/v1/b/amiji-prd.appspot.com/o/_global%2F_userdata%2FTzhWaAAohpgL0Ab1hWjYAMViuUw1%2FuserPics%2Fone%2Fthumb@64_userPic_one.png?generation=1539554414858017&alt=media", "username": "User1" },
    conversations: [{ "lastMessage": { "hasPendingNotification": true, "isRead": false, "message": "asdsad", "senderId": "user1", "senderName": "User1", "sentDate": "2019-11-21T08:50:57.796Z", "_ownMessage": true }, "noOfMessages": 13, "participants": { "FjKQGGhlqBhluDo28c6vCY8jhMX2": { "avatarPath": "https://www.googleapis.com/download/storage/v1/b/amiji-prd.appspot.com/o/_global%2F_userdata%2FFjKQGGhlqBhluDo28c6vCY8jhMX2%2FuserPics%2Fone%2Fthumb@64_userPic_one.png?generation=1542398429979347&alt=media", "chatDisabled": false, "id": "FjKQGGhlqBhluDo28c6vCY8jhMX2", "username": "Pascal" } }, "participantsArray": [ "FjKQGGhlqBhluDo28c6vCY8jhMX2", "TzhWaAAohpgL0Ab1hWjYAMViuUw1" ], "id": "D5iBweCuollGRSADodeY", "path": "conversations/D5iBweCuollGRSADodeY", "_chatpartner": { "avatarPath": "https://www.googleapis.com/download/storage/v1/b/amiji-prd.appspot.com/o/_global%2F_userdata%2FFjKQGGhlqBhluDo28c6vCY8jhMX2%2FuserPics%2Fone%2Fthumb@64_userPic_one.png?generation=1542398429979347&alt=media", "chatDisabled": false, "id": "FjKQGGhlqBhluDo28c6vCY8jhMX2", "username": "Pascal" } }],
    messages: [{ "hasPendingNotification": true, "isRead": true, "isWelcomeMessage": false, "message": "Testchat", "senderId": "user2", "senderName": "User2", "sentDate": "2019-01-07T10:36:38.296Z", "id": "SNh1pE8suVsaPteS4PRr", "path": "conversations/D5iBweCuollGRSADodeY/messages/SNh1pE8suVsaPteS4PRr" }],
    hasMoreConversations: false,
    hasMoreMessages: false,
    userActions: {}
  }),
  methods: {
    handleSelectedConversation() {
      //
    },
    loadNextConversations() {
      //
    },
    loadMoreMessages() {
      //
    },
    postMessage() {
      //
    }
  }
}
</script>

<style>
html, body {
    height: 100%;
    overflow: hidden;
    margin: 0;
}

#app {
      position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
}

.fullHeight {
  height: 100vh;
}
</style>
