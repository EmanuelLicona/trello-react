import { ICard } from './ICard'

export interface IBoard {
  id: number;
  title: string;
  cards: ICard[];
}
