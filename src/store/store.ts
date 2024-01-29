import { configureStore } from '@reduxjs/toolkit'
import { workspaceSlice } from './workspace/workspaceSlice'
import { boardSlice } from './workspace/boardSlice'
import { authSlice } from './auth/authSlice'

export const store = configureStore({
  reducer: {
    auth : authSlice.reducer,
    workspace: workspaceSlice.reducer,
    board: boardSlice.reducer
  },
})

export type StoreRootState = ReturnType<typeof store.getState>
export type StoreAppDispatch = typeof store.dispatch