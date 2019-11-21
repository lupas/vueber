import { unwrapFirestoreDoc } from './node_modules/firewings'

let unreadConversationsListener = null

export default {
  /** --------------------------------------------------------------------------------------------------------- **/
  /** ----------------------------------------------- LISTENERS ----------------------------------------------- **/
  /** --------------------------------------(Important: need to be closed)------------------------------------- **/

  /** Only unread Conversations */

  startUnreadConversationsListener({ commit, rootState }) {
    const userId = rootState.fireUser.currentUser.id

    /* Careful: Starting a listener that needs to be stopped */
    unreadConversationsListener = this.baseRef
      .where(`participantsArray`, 'array-contains', userId)
      .where('lastMessage.isRead', '==', false)
      .orderBy('lastMessage.sentDate', 'desc')
      .limit(100)
      .onSnapshot((query) => {
        const unreadConversations = unwrapFirestoreDoc(query)
        const filteredConvos = unreadConversations.filter(
          (item) => item.lastMessage.senderId !== userId
        )
        commit('SET_UNREAD_CONVERSATIONS', filteredConvos)
      })
  },

  stopUnreadConversationsListener() {
    try {
      unreadConversationsListener() // unsubscribes the listener
    } catch (e) {
      // NOT AN ERROR: ignore
    }
    unreadConversationsListener = null
  }
}
