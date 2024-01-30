import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyCKjWfg6dhCkxly99yzw_9n9rVwBHbxYZk",
  authDomain: "task-kanba.firebaseapp.com",
  projectId: "task-kanba",
  storageBucket: "task-kanba.appspot.com",
  messagingSenderId: "837341612815",
  appId: "1:837341612815:web:7cef8eff87d830c8604c7a"
}


// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const FirebaseAuth = getAuth(FirebaseApp)

// Initialize Cloud Firestore and get a reference to the service
export const FirebaseDB = getFirestore(FirebaseApp)