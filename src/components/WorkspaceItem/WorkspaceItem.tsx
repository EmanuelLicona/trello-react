import { useWorkspaceStore } from '../../hooks/useWorkspaceStore'


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
    <div className='border p-4 rounded-2xl shadow-md min-h-36 bg-slate-100'>

      <div className='flex justify-between items-center'>
        <h3 className='text-xl font-bold cursor-pointer'
          onClick={() => handleOnClickWorkspace(workspaceId)}
        >{title}</h3>
        <button className='text-red-500'
          onClick={() =>  handleClickDelete()}
        >Delete</button>
      </div>

      <hr className='my-2' />

      <div className='text-gray-500 text-sm'>
        <p>{description}</p>
      </div>
    
   
    </div>
  )
}
