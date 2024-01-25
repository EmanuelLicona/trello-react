import { IBoard, ICard } from '../interfaces'

export interface BoardProps {
  board: IBoard
  onDragEnd: (boardId: number, cardId: number) => void
  onDragEnter: (boardId: number, cardId: number) => void
  updateCard: (boardId: number, cardId: number, card: ICard) => void
}