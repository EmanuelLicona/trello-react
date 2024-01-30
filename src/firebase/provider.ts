import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { FirebaseAuth } from './config'

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, new GoogleAuthProvider())

    const { uid, displayName, email, photoURL } = result.user
    return {
      ok: true,
      uid: uid || '',
      displayName: displayName || '',
      email: email || '',
      photoURL: photoURL || ''
    }
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message || ''
    }
  }
}

export const registerUserWithEmailAndPassword = async ({ email, password, displayName }: { email: string, password: string, displayName: string }) => {
  try {
    const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL } = result.user

    if (!FirebaseAuth.currentUser)  throw new Error("User not logged in")
    await updateProfile(FirebaseAuth.currentUser, { displayName })

    return {
      ok: true,
      uid, displayName, email, photoURL
    }
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message || 'Error creating user'
    }
  }
}

export const singInWithEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {
  try {
    const result = await signInWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, displayName, photoURL } = result.user
    return {
      ok: true,
      uid, displayName, email, photoURL
    }
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message
    }
  }
}
export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()
}