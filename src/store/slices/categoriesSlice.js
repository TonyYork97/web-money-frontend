import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchGetcategories = createAsyncThunk('categories/get', async (params) => {
    const { data } = await axios.get('/app/category', { params });
    return data
})
export const fetchGetPaymentMethods = createAsyncThunk('categories/getPaymentMethods', async () => {
    const { data } = await axios.get('/app/payment-method');
    return data
})


const initialState = {
    data: null,
    dataPaymentMethods: null,
    isLoading: false,
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: {
        [fetchGetcategories.pending]: (state) => {
            state.isLoading = true
            state.data = null
        },
        [fetchGetcategories.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
        },
        [fetchGetcategories.rejected]: (state) => {
            state.isLoading = false
            state.data = null
        },
        [fetchGetPaymentMethods.pending]: (state) => {
            state.isLoading = true
            state.dataPaymentMethods = null
        },
        [fetchGetPaymentMethods.fulfilled]: (state, action) => {
            state.isLoading = false
            state.dataPaymentMethods = action.payload
        },
        [fetchGetPaymentMethods.rejected]: (state) => {
            state.isLoading = false
            state.dataPaymentMethods = null
        },
    }
})

export const categoriesReducer = categoriesSlice.reducer;