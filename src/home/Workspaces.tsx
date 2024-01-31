import { useEffect, useState } from 'react'
import { Header } from '../components/Header/Header'
import { WorkspaceContainer } from '../components/WorkspaceContainer/WorkspaceContainer'

import { WorkspaceItem } from '../components/WorkspaceItem/WorkspaceItem'
import { ModalCreateWorkspace } from '../components/ModalCreateWorkspace/ModalCreateWorkspace'
import { useWorkspaceStore } from '../hooks/useWorkspaceStore'
import { IWorkspace } from '../interfaces/IWorkspace'
import { useNavigate } from 'react-router-dom'

export const Workspaces = () => {
  const navigate = useNavigate()

  const { startLoadingWorkspace, workspaces, selectCurrentWorkspace } = useWorkspaceStore()
  const [recentlyViewed, setRecentlyViewed] = useState<IWorkspace[]>([])

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoadingWorkspace] = useState(false)


  const handleOnClickWorkspace = (workspaceId: string) => {
    selectCurrentWorkspace(workspaceId)
    navigate(`/board/${workspaceId}`)
  }
  const handleOnCloseModal = () => setIsOpenModal(!isOpenModal)



  useEffect(() => {
    startLoadingWorkspace()
  }, [])

  useEffect(() => {
    const copyArray = [...workspaces]
    const arrayWhithViewAt = copyArray.filter(workspace => workspace.viewAt !== undefined)
    
    
    
    if (arrayWhithViewAt.length > 0) {
      const copy = arrayWhithViewAt.sort((a, b) => b.viewAt! - a.viewAt!)
      setRecentlyViewed(copy.slice(0, 1))
    }

    if (workspaces.length === 0) {
      setRecentlyViewed([])
    }

  }, [workspaces])

  return (
    <>
      <Header />

      <div className='mt-10'>
        <div className='flex justify-end px-4'>

          <button className='px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white' onClick={handleOnCloseModal}>
            New
          </button>
        </div>


        <div className='px-4'>
          <h2 className='text-2xl mb-4'>Recently viewed </h2>

          {
            isLoadingWorkspace ? <p>Cargando...</p> :
              <WorkspaceContainer>
                {
                  recentlyViewed.map((workspace, index) => (
                    <WorkspaceItem
                      key={index}
                      workspaceId={workspace.workspaceId}
                      title={workspace.title}
                      description={workspace.description}
                      handleOnClickWorkspace={handleOnClickWorkspace}
                    />
                  ))
                }
              </WorkspaceContainer>
          }

        </div>

        <div className='mt-10 px-4'>
          <h2 className='text-2xl mb-4'>Your workspaces</h2>
          <WorkspaceContainer>

            {
              (workspaces && !isLoadingWorkspace) && workspaces.map((workspace, index) => (
                <WorkspaceItem
                  key={index}
                  workspaceId={workspace.workspaceId}
                  title={workspace.title}
                  description={workspace.description}
                  handleOnClickWorkspace={handleOnClickWorkspace}
                />
              ))
            }

            {
              isLoadingWorkspace ? <p>Cargando...</p> : ''
            }

          </WorkspaceContainer>
        </div>
      </div>


      {
        isOpenModal && <ModalCreateWorkspace onClose={handleOnCloseModal} />
      }


    </>
  )
}
