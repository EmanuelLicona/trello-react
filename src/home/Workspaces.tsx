import { useAuthStore } from '../hooks/useAuthStore'

export const Workspaces = () => {
  const { startLogout } = useAuthStore()

  const handleLogout = () => {
    startLogout()
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
