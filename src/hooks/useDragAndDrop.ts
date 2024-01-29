import { useState } from 'react'
import { useBoardStore } from './useBoardStore'

export const useDragAndDrop = () => {
  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  })

  const { onCardMove } = useBoardStore()

  const onDragEnd = (boardId: number, cardId: number) => {
        
    onCardMove(boardId, cardId, targetCard.boardId, targetCard.cardId)

    setTargetCard({
      boardId: 0,
      cardId: 0,
    })
  }

  const onDragEnter = (boardId: number, cardId: number) => {
    if (targetCard.cardId === cardId) return

    setTargetCard({
      boardId: boardId,
      cardId: cardId,
    })
  }

  return {
    targetCard,
    onDragEnd,
    onDragEnter,
  }
}
