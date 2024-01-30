import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthStatus } from '../auth/enums/authStatus'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { HomeRoutes } from '../home/routes/HomeRoutes'

import { useCheckAuth } from '../hooks/useCheckAuth'

export const AppRouter = () => {
  const { status } = useCheckAuth()
  const authStatus = status

  return (
    <Routes>

      {
        (authStatus === AuthStatus.NOT_AUTHENTICATED)
          ? <Route path="auth/*" element={<AuthRoutes />} />
          : <Route path="/*" element={<HomeRoutes />} />
      }

      <Route path="/*" element={<Navigate to="/auth" />} />

    </Routes>
  )
}
