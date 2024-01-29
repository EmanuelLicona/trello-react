import { Route, Routes, Navigate } from 'react-router-dom'
import { LoginPage } from '../pages/login/LoginPage'
import { RegisterPage } from '../pages/register/RegisterPage'

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* <Route path="/*" element={<Navigate to="/auth/login" />} /> */}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
