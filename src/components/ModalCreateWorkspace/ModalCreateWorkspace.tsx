import { useForm } from 'react-hook-form'
import { useWorkspaceStore } from '../../hooks/useWorkspaceStore'


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
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>

      <div className=' mx-2 relative bg-white w-full sm:w-1/3 md:w-2/3 lg:w-2/5 rounded-md'>

        <button className='absolute top-0 right-0  px-3'
          onClick={() => onClose()}>x</button>

        <h1 className='text-xl font-bold p-2 text-center'>New Workspace</h1>


        <form 
        className='flex flex-col gap-2 p-2'
        onSubmit={handleSubmit(handleCreateWorkspace)}>
          <input type="text"
            className='border p-2 rounded-md
              focus:outline-none focus:border-sky-500
            '
            {
            ...register('name', {
              required: 'Name is required',
            })
            }

            placeholder='Workspace Name'
          />
          {errors.name && <p>{errors.name.message + '.'}</p>}
          <textarea cols={30} rows={10}
            className='border p-2 rounded-md
              focus:outline-none focus:border-sky-500
              min-h-[150px] h-[150px]
            '
            {
            ...register('description', {
              required: 'Description is required',
            })
            }
            placeholder='Workspace Description'
          />
          {errors.description && <p>{errors.description.message + '.'}</p>}


          <button type="submit" className='bg-blue-500 text-white p-2 rounded-md' >Add Workspace</button>
        </form>

      </div>
    </div>
  )
}
