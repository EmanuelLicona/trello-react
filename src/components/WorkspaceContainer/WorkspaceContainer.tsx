import { ReactNode } from 'react'

import './WorkspaceContainer.css'

export const WorkspaceContainer = ({ children }: { children: ReactNode}) => {
  return (
    <div className='workspace-container'>
      {children}
    </div>
  )
}
