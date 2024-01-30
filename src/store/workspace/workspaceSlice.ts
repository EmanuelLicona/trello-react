import { createSlice } from '@reduxjs/toolkit'
import { IWorkspace } from '../../interfaces/IWorkspace'



export const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    currentWorkspace: null as IWorkspace | null,
    workspaces: [] as IWorkspace[],
  },
  reducers: {
    setWorkspaces: (state, { payload }: { payload: IWorkspace[] }) => {
      payload.sort((a: IWorkspace, b: IWorkspace) => b.updateAt - a.updateAt)
      state.workspaces = payload
    },

    addNewWorkspace: (state, { payload }: { payload: IWorkspace }) => {
      state.workspaces.push(payload)
    },

    setCurrentWorkspace: (state, { payload }: { payload: IWorkspace }) => {
      state.currentWorkspace = payload
    },

    clearCurrentWorkspace: (state) => {
      state.currentWorkspace = null
    },

    deleteWorkspace: (state, { payload }: { payload: string }) => {
      state.workspaces = state.workspaces.filter((item: IWorkspace) => item.workspaceId !== payload)
    }
  },
})

export const {
  setWorkspaces,
  addNewWorkspace,
  setCurrentWorkspace,
  clearCurrentWorkspace,
  deleteWorkspace
} = workspaceSlice.actions