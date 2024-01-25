import { ILabel } from './ILabel'
import { ITask } from './ITask'

export interface ICard {
  id: number
  title: string
  labels: ILabel[]
  date: string
  tasks: ITask[]
  desc?: string
}