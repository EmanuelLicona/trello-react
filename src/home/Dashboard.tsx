
import { CustomInput } from '../components/CustomInput/CustomInput'
import { IBoard } from '../interfaces'
import { Navigate } from 'react-router-dom'

import './Dashboard.css'
import { Board } from '../components/Board/Board'
import { useBoardStore } from '../hooks/useBoardStore'
import { useDragAndDrop } from '../hooks/useDragAndDrop'
import { useWorkspaceStore } from '../hooks/useWorkspaceStore'
import { useEffect, useState } from 'react'
import { ButtonWorkspace } from '../components/ButtonWorkspace/ButtonWorkspace'


export const Dashboard = () => {

  const { boards, onAddBoard, onSetBoards } = useBoardStore()
  const { onDragEnd, onDragEnter } = useDragAndDrop()

  const { currentWorkspace, startUpdateWorkspace } = useWorkspaceStore()
  const [isFirstTime, setIsFirstTime] = useState(true)

  useEffect(() => {
    if (!currentWorkspace) return
    onSetBoards(currentWorkspace.boards || [])
  }, [])

  useEffect(() => {
    if (!currentWorkspace) return
    if (!isFirstTime) {
      startUpdateWorkspace({ ...currentWorkspace, boards: [...boards] })
    }

    setIsFirstTime(false)
  }, [boards])

  if (!currentWorkspace) return <Navigate to="/workspaces" />



  // async function fetchData() {
  //   const boards: IBoard[] = await fetchBoardList()
  //   setBoardsTemp(boards)
  // }




  return (
    <div className='app'>

      <div className='app-nav'>
        <h1 className='text-4xl uppercase font-bold'>{currentWorkspace.title}</h1>
      </div>

      <div className='app-boards-container'>
        <div className='app-boards'>

          {
            boards.map((board: IBoard) => (
              <Board
                key={board.id}
                board={board}
                onDragEnd={onDragEnd}
                onDragEnter={onDragEnter}
              />
            ))
          }

          <div className='app-boards-last'>
            <CustomInput
              displayClass="app-boards-add-board"
              editClass="app-boards-add-board-edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={onAddBoard} />
          </div>


        </div>
      </div>

      <ButtonWorkspace />
    </div>
  )
}
