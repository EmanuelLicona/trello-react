import { createSlice } from '@reduxjs/toolkit'
import { AuthStatus } from '../../auth/enums/authStatus'
import { IUser } from '../../interfaces/IUser'


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: AuthStatus.NOT_AUTHENTICATED + '',
        // status: AuthStatus.AUTHENTICATED + '', 
        user: {} as IUser,
        errorMessage: undefined,
    },
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking'
            state.user = {} as IUser
            state.errorMessage = undefined
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated'
            state.user = payload
            state.errorMessage = undefined
        },
        onLogout: ( state, { payload } ) => {
            state.status =  AuthStatus.NOT_AUTHENTICATED + ''
            state.user   = {} as IUser
            state.errorMessage = payload
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined
        }
    }
})


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions