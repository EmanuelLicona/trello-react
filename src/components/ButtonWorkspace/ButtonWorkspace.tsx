import { NavLink } from 'react-router-dom'

export const ButtonWorkspace = () => {
  return (
    <div className="text-xl fixed bottom-10 right-10 bg-slate-50 px-5 rounded-md">
      <NavLink to="/workspaces">Workspaces</NavLink>
    </div>
  )
}
