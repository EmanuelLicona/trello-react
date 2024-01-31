import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { IBoard } from '../interfaces'

import { CustomInput } from '../components/CustomInput/CustomInput'
import { Board } from '../components/Board/Board'
import { ButtonWorkspace } from '../components/ButtonWorkspace/ButtonWorkspace'

import { useBoardStore } from '../hooks/useBoardStore'
import { useDragAndDrop } from '../hooks/useDragAndDrop'
import { useWorkspaceStore } from '../hooks/useWorkspaceStore'

import './Dashboard.css'


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

      <div className='app-nav px-7 bg-slate-500/60 flex justify-between'>
        <h1 className='text-2xl'>{currentWorkspace.title}</h1>
        <h1 className='text-2xl'>{new Date(currentWorkspace.updateAt).toLocaleDateString()}</h1>
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
