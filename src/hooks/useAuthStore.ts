import { useDispatch } from 'react-redux'
import { checkingCredentials, login, logout } from '../store/auth/authSlice'
import { logoutFirebase, registerUserWithEmailAndPassword, singInWithEmailAndPassword, singInWithGoogle } from '../firebase/provider'

export const useAuthStore = () => {

  const dispatch = useDispatch()

  const startGoogleLogin = async () => {
    dispatch(checkingCredentials())

    const result = await singInWithGoogle()
    if (!result.ok) return dispatch(logout(result.errorMessage))
    const { displayName, email, photoURL, uid } = result

    if (!uid || !email) throw new Error('Missing information from Google Account')
    dispatch(login({ displayName, email, photoURL, uid }))
  }

  const startCreateUserWithEmailPassword = async (email: string, password: string, displayName: string) => {
    const result = await registerUserWithEmailAndPassword({ email, password, displayName })
    if (!result.ok) return dispatch(logout(result.errorMessage))

    const { uid, photoURL } = result

    dispatch(login({ uid: uid || '', email, displayName, photoURL: photoURL || '' }))
  }

  const startLoginWithEmailPassword = async (email: string, password: string) => {
    dispatch(checkingCredentials())

    const result = await singInWithEmailAndPassword({ email, password })
    if (!result.ok) return dispatch(logout(result.errorMessage))

    const { uid, photoURL, displayName } = result
    dispatch(login({
      uid: uid || '',
      email,
      displayName: displayName || '',
      photoURL: photoURL || ''
    }))
  }

  const startLogout = async () => {
    await logoutFirebase()
    dispatch(logout())
  }

  return {
    startGoogleLogin,
    startLoginWithEmailPassword,
    startLogout,

    startCreateUserWithEmailPassword,
  }
}