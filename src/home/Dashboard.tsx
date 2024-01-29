
import { CustomInput } from '../components/CustomInput/CustomInput'
import { IBoard } from '../interfaces'

import './Dashboard.css'
import { Board } from '../components/Board/Board'
import { useWorkspaceStore } from '../hooks/useWorkspaceStore'
import { useBoardStore } from '../hooks/useBoardStore'
import { useDragAndDrop } from '../hooks/useDragAndDrop'

export const Dashboard = () => {

  const { boards, onAddBoard } = useBoardStore()
  const { onDragEnd, onDragEnter } = useDragAndDrop()

  const { currentWorkspace } = useWorkspaceStore()

  // useEffect(() => {
  //   fetchData()
  // }, [])

  // useEffect(() => {
  //   updateLocalStorageBoards(boardsTemp)
  // }, [boardsTemp])

  // async function fetchData() {
  //   const boards: IBoard[] = await fetchBoardList()
  //   setBoardsTemp(boards)
  // }




  return (
    <div className='app'>

      <div className='app-nav'>
        <h1>{currentWorkspace.title}</h1>
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
    </div>
  )
}
