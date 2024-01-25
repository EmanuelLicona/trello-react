import { useDispatch, useSelector } from 'react-redux'
import { StoreRootState } from '../store/store'
import { IBoard, ICard } from '../interfaces'
import { addCard, addboard, removeBoard, removeCard, updateCard } from '../store/workspace/boardSlice'

export const useBoardStore = () => {

  const dispatch = useDispatch()
  const {boards} = useSelector((state: StoreRootState) => state.board)

  //  * Methods of Board
  //  TODO: set boards

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


  return {
    boards,

    // Methods of Board
    onAddBoard,
    onRemoveBoard,

    // Methods of Card
    onAddCard,
    onRemoveCard,
    onUpdateCard
  }
}