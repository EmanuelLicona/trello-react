import { useDispatch, useSelector } from 'react-redux'
import { StoreRootState } from '../store/store'
import { IBoard, ICard } from '../interfaces'
import { addCard, addboard, cardMove, removeBoard, removeCard, setBoards, updateCard } from '../store/workspace/boardSlice'

export const useBoardStore = () => {

  const dispatch = useDispatch()
  const {boards} = useSelector((state: StoreRootState) => state.board)

  //  * Methods of Board

  const onSetBoards = (boards: IBoard[]) => {
    setBoards(boards)
  }

  const onAddBoard = (title: string) => {
      const board: IBoard = {
        id: Date.now() + Math.random() * 2,
        title,
        cards: []
      } 

      dispatch(addboard(board))
  }

  const onRemoveBoard = (boardId: number) => {
    dispatch(removeBoard(boardId))
  }


  //  * Methods of Card
  const onAddCard = (boardId: number, title: string) => {
    const card = {} as ICard
    card.id = Date.now() + Math.random() * 2
    card.title = title
  
    dispatch(addCard({ boardId, card }))
  }

  const onRemoveCard = (boardId: number, cardId: number) => {
    dispatch(removeCard({ boardId, cardId }))
  }

  const onUpdateCard = (boardId: number, cardId: number, card: ICard) => {
    dispatch(updateCard({ boardId, cardId, card }))
  }

  const onCardMove = (sourceBoardId: number, sourceCardId: number, targetBoardId: number, targetCardId: number) => {
     // * Board que quiero mover
     const sourceBoardIndex = boards.findIndex((item: IBoard) => item.id === sourceBoardId)
     if (sourceBoardIndex < 0) return
   
     const sourceCardIndex = boards[sourceBoardIndex].cards.findIndex((item: ICard) => item.id === sourceCardId)
     if (sourceCardIndex < 0) return
 
     // * Board destino
     const targetBoardIndex = boards.findIndex((item: IBoard) => item.id ===  targetBoardId)
     if (targetBoardIndex < 0) return
 
     let targetCardIndex = 0
     if ( targetCardId !== -1) { // ! si es -1 es porque no hay card destino
       targetCardIndex = boards[targetBoardIndex].cards.findIndex((item: ICard) => item.id === targetCardId)
     }
     if (targetCardIndex < 0) return

     dispatch(cardMove({ sourceBoardIndex, sourceCardIndex, targetBoardIndex, targetCardIndex }))
  }


  return {
    boards,

    // Methods of Board
    onSetBoards,
    onAddBoard,
    onRemoveBoard,

    // Methods of Card
    onAddCard,
    onRemoveCard,
    onUpdateCard,

    onCardMove
  }
}