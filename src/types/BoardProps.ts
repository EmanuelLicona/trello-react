import { IBoard } from '../interfaces'

export interface BoardProps {
  board: IBoard
  onDragEnd: (boardId: number, cardId: number) => void
  onDragEnter: (boardId: number, cardId: number) => void
}