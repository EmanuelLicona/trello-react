import { useForm } from 'react-hook-form'
import { useWorkspaceStore } from '../../hooks/useWorkspaceStore'

import './ModalCreateWorkspace.css'

export const ModalCreateWorkspace = ({onClose}: {onClose: () => void}) => {

  const { saveNewWorkspace } = useWorkspaceStore()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const handleCreateWorkspace = (data: any) => {
    const { name, description } = data
    saveNewWorkspace(name, description)

    reset()
    onClose()
  }

  return (
    <div className='background-modal-workspace'>


      <div className='modal-content'>
        <button className='close-modal-workspace'
          onClick={() => onClose()}
        >x</button>
        <h1>New Workspace</h1>


        <form onSubmit={handleSubmit(handleCreateWorkspace)}>
          <input type="text"
            {
            ...register('name', {
              required: 'Name is required',
            })
            }

            placeholder='Workspace Name'
          />
          {errors.name && <p>{errors.name.message + '.'}</p>}
          <textarea cols={30} rows={10}
            {
            ...register('description', {
              required: 'Description is required',
            })
            }
            placeholder='Workspace Description'
          />
          {errors.description && <p>{errors.description.message + '.'}</p>}


          <button type="submit" >Add Workspace</button>
        </form>

      </div>
    </div>
  )
}
