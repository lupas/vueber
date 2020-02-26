import firebase from 'firebase/app'

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- END: Import Scripts ---------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

export default async (ctx, inject) => {
  const options = {"config":{"apiKey":"AIzaSyBPbKMVLeY1x_1sgikvuP5cyfUd6iFs0l0","authDomain":"vueber-fire-nuxt-demo.firebaseapp.com","databaseURL":"https:\u002F\u002Fvueber-fire-nuxt-demo.firebaseio.com","projectId":"vueber-fire-nuxt-demo","storageBucket":"vueber-fire-nuxt-demo.appspot.com","messagingSenderId":"499279429791","appId":"1:499279429791:web:e0ef9deb856d8ed2c1a2aa"},"services":{"firestore":true}}
  const firebaseConfig = options.config

  // Don't include when Firebase is already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE AUTH ---------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE REALTIME DB --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE FIRESTORE --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

    await import(/* webpackChunkName: 'firebase-firestore' */'firebase/firestore')

    const fireStore = firebase.firestore()
    const fireStoreObj = firebase.firestore
    inject('fireStore', fireStore)
    inject('fireStoreObj', fireStoreObj)

    const enablePersistence = options.services.firestore.enablePersistence
    if (enablePersistence && process.client) {
      try {
        await fireStore.enablePersistence((
          typeof enablePersistence === 'object'
            ? enablePersistence
            : {}
        ))
      } catch (err) {
        if (err.code == 'failed-precondition') {
          console.info("Firestore Persistence not enabled. Multiple tabs open, persistence can only be enabled in one tab at a a time.")
        } else if (err.code == 'unimplemented') {
          console.info("Firestore Persistence not enabled. The current browser does not support all of the features required to enable persistence.")
        }
      }
    }

  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------------ FIREBASE STORAGE --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE FUNCTIONS --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE MESSAGING --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE REALTIME DB --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Performance can only be initiated on client side

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE ANALYTICS --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Analytics can only be initiated on the client side

  /** --------------------------------------------------------------------------------------------- **/
  /** --------------------------------- FIREBASE REMOTE CONFIG DB --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/
}
