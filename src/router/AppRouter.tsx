import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthStatus } from '../auth/enums/authStatus'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { HomeRoutes } from '../home/routes/HomeRoutes'

import { StoreRootState } from '../store/store'

export const AppRouter = () => {
  const { status } = useSelector((state: StoreRootState) => state.auth)
  const authStatus = status

  return (
    <Routes>

      {
        (authStatus === AuthStatus.AUTHENTICATED)
          ? <Route path="/*" element={<HomeRoutes />} />
          : <Route path="auth/*" element={<AuthRoutes />} />
      }

      <Route path="/*" element={<Navigate to="/auth" />} />

    </Routes>
  )
}
