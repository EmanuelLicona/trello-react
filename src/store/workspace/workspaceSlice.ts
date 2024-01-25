import { createSlice } from '@reduxjs/toolkit'
import { IWorkspace } from '../../interfaces/IWorkspace'

const initial: IWorkspace = {
  workspaceId: "workspaceId", 
  title: "Workspace Title",
  description: "Description of Workspace",
  boards: [],
}

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    currentWorkspace: initial,
    workspaces: [] as IWorkspace[],
  },
  reducers: {},
})