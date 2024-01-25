import { ICard } from '../interfaces'

export interface CardProps {
  card: ICard
  boardId: number
  onDragEnd: (boardId: number, cardId: number) => void
  onDragEnter: (boardId: number, cardId: number) => void
}