import { useEffect, useState } from 'react'

import { CustomInput } from '../components/CustomInput/CustomInput'
import { IBoard, ICard } from '../interfaces'

import { fetchBoardList, updateLocalStorageBoards } from '../helpers/boardAPI'

import './Dashboard.css'
import { Board } from '../components/Board/Board'
import { useWorkspaceStore } from '../hooks/useWorkspaceStore'
import { useBoardStore } from '../hooks/useBoardStore'

export const Dashboard = () => {

  const { boards, onAddBoard } = useBoardStore()

  // ! =============================================================================
  const [boardsTemp, setBoardsTemp] = useState<IBoard[]>([])
  const { currentWorkspace } = useWorkspaceStore()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const boards: IBoard[] = await fetchBoardList()
    setBoardsTemp(boards)
  }

  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  })

  const addboardHandler = (name: string) => {
    onAddBoard(name)
  }

  const updateCard = (boardId: number, cardId: number, card: ICard) => {
    const boardIndex = boardsTemp.findIndex((item) => item.id === boardId)
    if (boardIndex < 0) return

    const tempBoardsList = [...boardsTemp]
    const cards = tempBoardsList[boardIndex].cards

    const cardIndex = cards.findIndex((item) => item.id === cardId)
    if (cardIndex < 0) return

    tempBoardsList[boardIndex].cards[cardIndex] = card

    setBoardsTemp(tempBoardsList)
  }

  const onDragEnd = (boardId: number, cardId: number) => {
    const sourceBoardIndex = boardsTemp.findIndex(
      (item: IBoard) => item.id === boardId,
    )
    if (sourceBoardIndex < 0) return

    const sourceCardIndex = boardsTemp[sourceBoardIndex]?.cards?.findIndex(
      (item) => item.id === cardId,
    )

    if (sourceCardIndex < 0) return

    const targetBoardIndex = boardsTemp.findIndex(
      (item: IBoard) => item.id === targetCard.boardId,
    )
    if (targetBoardIndex < 0) return

    const targetCardIndex = boardsTemp[targetBoardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cardId,
    )
    if (targetCardIndex < 0) return

    const tempBoardsList = [...boardsTemp]
    const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex]
    tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1)
    tempBoardsList[targetBoardIndex].cards.splice(
      targetCardIndex,
      0,
      sourceCard,
    )
    setBoardsTemp(tempBoardsList)

    setTargetCard({
      boardId: 0,
      cardId: 0,
    })
  }

  const onDragEnter = (boardId: number, cardId: number) => {
    console.log(boardId, cardId)

    if (targetCard.cardId === cardId) return

    setTargetCard({
      boardId: boardId,
      cardId: cardId,
    })
  }

  useEffect(() => {
    updateLocalStorageBoards(boardsTemp)
  }, [boardsTemp])


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
                updateCard={updateCard}
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
              onSubmit={addboardHandler} />
          </div>


        </div>
      </div>
    </div>
  )
}
