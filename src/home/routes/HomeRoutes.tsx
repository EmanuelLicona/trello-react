import { Route, Routes, Navigate } from 'react-router-dom'
import { Workspaces } from '../Workspaces'
import { Dashboard } from '../Dashboard'

export const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Workspaces />} />
      <Route path="/board" element={<Dashboard />} />

      {/* <Route path="/*" element={<Navigate to="/auth/login" />} /> */}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
