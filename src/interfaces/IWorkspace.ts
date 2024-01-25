import { IBoard } from './IBoard'

export interface IWorkspace {
  workspaceId: string
  title: string
  description: string
  boards?: IBoard[]
}