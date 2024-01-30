import { useWorkspaceStore } from '../../hooks/useWorkspaceStore'
import './WorkspaceItem.css'


interface IWorkspaceItem {
  workspaceId: string
  title: string
  description: string
  handleOnClickWorkspace: (workspaceId: string) => void
}


export const WorkspaceItem = ({ workspaceId, title, description, handleOnClickWorkspace }: IWorkspaceItem) => {

  const { startDeleteWorkspace } = useWorkspaceStore()

  const handleClickDelete = () => {
    startDeleteWorkspace(workspaceId)
  }

  return (
    <div className="item-workspace">
      <div className="item-workspace-header">
        <h3 className="item-workspace-title" onClick={() => handleOnClickWorkspace(workspaceId)}>{title}</h3>
        <button className="item-delete-button"
          onClick={() => handleClickDelete()}
        >Eliminar</button>
      </div>
      <hr className="item-hr-divider" />
      <p className="item-workspace-description">{description}</p>
    </div>
  )
}
