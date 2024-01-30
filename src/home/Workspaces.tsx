import { useEffect, useState } from 'react'
import { Header } from '../components/Header/Header'
import { WorkspaceContainer } from '../components/WorkspaceContainer/WorkspaceContainer'

import './Workspaces.css'
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
    const copy = [...workspaces]
    setRecentlyViewed(copy.slice(0, 3))
  }, [workspaces])

  return (
    <>
      <Header />

      <div className='workspaces'>

        <div className='workspaces-header'>
          <h1>

          </h1>

          <button onClick={handleOnCloseModal}>
            Crear
          </button>
        </div>


        <div className=''>
          <h2 className='text-2xl mb-4'>Vistos recientemente</h2>
          <WorkspaceContainer>
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
          </WorkspaceContainer>

        </div>

        <div className='mt-10'>
          <h2 className='text-2xl mb-4'>Tus tableros </h2>
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
