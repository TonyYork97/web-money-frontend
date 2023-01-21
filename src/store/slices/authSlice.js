import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import axios from '../../axios'

export const fetchSignUp = createAsyncThunk('auth/signUp', async (params) => {
    const { data } = await axios.post('/auth/signup', params);

    if ('accessToken' in data) {
        window.localStorage.setItem('token', data.accessToken)
    }
    return data
})

export const fetchLogin = createAsyncThunk('auth/login', async (params) => {
    const { data } = await axios.post('/auth/login', params);

    if ('accessToken' in data) {
        window.localStorage.setItem('token', data.accessToken)
    }
    return data
})

export const fetchChangeEmail = createAsyncThunk('auth/changeEmail', async (params) => {
    const { data } = await axios.post('/auth/change-email', params);

    if ('accessToken' in data) {
        window.localStorage.setItem('token', data.accessToken)
    }
    return data
}
)
export const fetchChangePassword = createAsyncThunk('auth/changePassword', async (params) => {
    const { data } = await axios.post('/auth/change-password', params);

    if ('accessToken' in data) {
        window.localStorage.setItem('token', data.accessToken)
    }
    return data
})

export const fetchChangeName = createAsyncThunk('auth/changeName', async (params) => {
    const { data } = await axios.post('/auth/change-name', params);

    if ('accessToken' in data) {
        window.localStorage.setItem('token', data.accessToken)
    }
    return data
})

export const fetchChangeLastName = createAsyncThunk('auth/changeName', async (params) => {
    const { data } = await axios.post('/auth/change-lastname', params);

    if ('accessToken' in data) {
        window.localStorage.setItem('token', data.accessToken)
    }
    return data
})

export const fetchLogOut = createAsyncThunk('auth/logOut', async () => {
    await axios.post('/auth/logout');
    localStorage.removeItem('token');
})


export const fetchCheckAuth = createAsyncThunk('auth/checkAuth', async () => {
    const { data } = await axios.get('/auth/refresh', { withCredentials: true });
    if ('accessToken' in data) {
        window.localStorage.setItem('token', data.accessToken)
    }
    return data
})



const initialState = {
    data: null,
    isLoading: false,
    error: null,

    isLoadingChangeEmail: false,
    changeEmailError: null,
    isSuccessChangeEmail: false,

    isLoadingChangePassword: false,
    changePasswordError: null,
    isSuccessChangePassword: false,

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setChangeEmailError: (state, action) => {
            state.changeEmailError = action.payload
        },
        setIsSuccessChangeEmail: (state, action) => {
            state.isSuccessChangeEmail = action.payload
        },
        setChangePasswordError: (state, action) => {
            state.changePasswordError = action.payload
        },
        setIsSuccessChangePassword: (state, action) => {
            state.isSuccessChangePassword = action.payload
        },
    },
    extraReducers: {
        [fetchSignUp.pending]: (state) => {
            state.isLoading = true
            state.error = null
            state.data = null
        },
        [fetchSignUp.fulfilled]: (state, action) => {
            state.isLoading = false
            if (action.payload?.message) {
                state.data = null
                state.error = action.payload
            } else {
                state.data = action.payload
                state.error = null
            }
        },
        [fetchSignUp.rejected]: (state) => {
            state.isLoading = false
            state.error = 'error'
            state.data = null
        },
        [fetchLogin.pending]: (state) => {
            state.isLoading = true
            state.error = null
            state.data = null
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.isLoading = false
            if (action.payload?.message) {
                state.data = null
                state.error = action.payload
            } else {
                state.data = action.payload
                state.error = null
            }
        },
        [fetchLogin.rejected]: (state) => {
            state.isLoading = false
            state.data = null
            state.error = 'error'

        },
        [fetchChangeEmail.pending]: (state) => {
            state.isSuccessChangeEmail = false
            state.changeEmailError = null
            state.isLoadingChangeEmail = true
        },
        [fetchChangeEmail.fulfilled]: (state, action) => {
            state.isLoadingChangeEmail = false
            if (!action.payload?.message) {
                state.isSuccessChangeEmail = true
                state.data = action.payload
                state.changeEmailError = null
            } else {
                state.changeEmailError = action.payload
            }
        },
        [fetchChangeEmail.rejected]: (state) => {
            state.changeEmailError = 'Не удалось изменить E-mail! Повторите попытку'
            state.isSuccessChangeEmail = false
            state.isLoadingChangeEmail = false
        },
        [fetchChangePassword.pending]: (state) => {
            state.isSuccessChangePassword = false
            state.isLoadingChangePassword = true
            state.changePasswordError = null
        },
        [fetchChangePassword.fulfilled]: (state, action) => {
            state.isLoadingChangePassword = false
            if (!action.payload?.message) {
                state.data = action.payload
                state.isSuccessChangePassword = true
                state.changePasswordError = null
            } else {
                state.isSuccessChangePassword = false
                state.changePasswordError = action.payload
            }
        },
        [fetchChangePassword.rejected]: (state, action) => {
            state.isSuccessChangePassword = false
            state.isLoadingChangePassword = false
            state.changePasswordError = "Не удалось изменить пароль"
        },
        [fetchChangeName.pending]: (state) => {
            state.isLoading = true
            state.data = null
        },
        [fetchChangeName.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
        },
        [fetchChangeName.rejected]: (state) => {
            state.isLoading = false
            state.data = null
        },
        [fetchChangeLastName.pending]: (state) => {
            state.isLoading = true
            state.data = null
        },
        [fetchChangeLastName.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
        },
        [fetchChangeLastName.rejected]: (state) => {
            state.isLoading = false
            state.data = null
        },
        [fetchLogOut.pending]: (state) => {
            state.isLoading = true
            state.data = null
        },
        [fetchLogOut.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = null
        },
        [fetchLogOut.rejected]: (state) => {
            state.isLoading = false
            state.data = null
        },
        [fetchCheckAuth.pending]: (state) => {
            state.isLoading = true
            state.data = null
        },
        [fetchCheckAuth.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
        },
        [fetchCheckAuth.rejected]: (state) => {
            state.isLoading = false
            state.data = null
            window.localStorage.removeItem('token')
            window.location.reload()
        },
    }

})


export const userIsAuth = state => Boolean(state.auth.data);

export const {
    setChangeEmailError,
    setIsSuccessChangeEmail,
    setChangePasswordError,
    setIsSuccessChangePassword
} = authSlice.actions;

export const authReducer = authSlice.reducer;