import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCoCp2nR5Xyqm1mB4dX2yBdgW5zCNvTDp8",
  authDomain: "nextfire-app-2b7e8.firebaseapp.com",
  projectId: "nextfire-app-2b7e8",
  storageBucket: "nextfire-app-2b7e8.appspot.com",
  messagingSenderId: "667871913416",
  appId: "1:667871913416:web:b18ee65ffba703bfe64cfd",
  measurementId: "G-L6SB6YLG5D"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Converts number to firestore Timestamp > takes number returns timestamp
export const fromMillis = firebase.firestore.Timestamp.fromMillis;

// Create timestamp at server time UTC
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

// Increment value or reduce it without knowing it
export const increment = firebase.firestore.FieldValue.increment;

// Get metadata for image uploads to storage bucket
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;


/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
 export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}