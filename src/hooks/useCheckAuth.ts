import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FirebaseAuth } from '../firebase/config'
import { login, logout } from '../store/auth/authSlice'
import { StoreRootState } from '../store/store'

export const useCheckAuth = () => {
  const { status } = useSelector((state: StoreRootState) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout())

      const { uid, email, displayName, photoURL } = user
      dispatch(login({ 
        uid : uid || '', 
        email : email || '' , 
        displayName : displayName || '', 
        photoURL: photoURL || '' 
      }))

      // dispatch(startLoadingNotes())
    })
  }, [])

  return { status }
}
