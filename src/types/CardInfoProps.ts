import { ICard } from '../interfaces'

export interface CardInfoProps {
  onClose: () => void
  card: ICard
  boardId: number
}