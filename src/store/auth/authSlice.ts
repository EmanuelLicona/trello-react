import { createSlice } from '@reduxjs/toolkit'
import { AuthStatus } from '../../auth/enums/authStatus'
import { IUser } from '../../interfaces/IUser'


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: AuthStatus.NOT_AUTHENTICATED + '',
        user: {} as IUser,
        errorMessage: '',
    },
    reducers: {
        login: ( state, { payload }: { payload: IUser } ) => {
            state.status = 'authenticated'
            state.user = payload
            state.errorMessage = ''
        },

        logout: ( state, { payload }: { payload: string | undefined } ) => {
            state.status =  AuthStatus.NOT_AUTHENTICATED + ''
            state.user   = {} as IUser
            state.errorMessage = payload || ''
        },

        checkingCredentials: (state) => {
            state.status = AuthStatus.CHECKING + ''
        },

        clearErrorMessage: ( state ) => {
            state.errorMessage = ''
        }
    }
})


// Action creators are generated for each case reducer function
export const { 
    checkingCredentials,
    login,
    logout,
    clearErrorMessage
 } = authSlice.actions