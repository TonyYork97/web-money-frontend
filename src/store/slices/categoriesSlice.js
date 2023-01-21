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
    categoriesError: null,
    paymentMethodsError: null
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: {
        [fetchGetcategories.pending]: (state) => {
            state.isLoading = true
            state.data = null
            state.categoriesError = null
        },
        [fetchGetcategories.fulfilled]: (state, action) => {
            state.isLoading = false
            if (!action.payload?.message) {
                state.categoriesError = null
                state.data = action.payload
            } else {
                state.data = null
                state.categoriesError = action.payload
            }
        },
        [fetchGetcategories.rejected]: (state) => {
            state.isLoading = false
            state.categoriesError = 'error'
            state.data = null
        },
        [fetchGetPaymentMethods.pending]: (state) => {
            state.isLoading = true
            state.dataPaymentMethods = null
            state.paymentMethodsError = null
        },
        [fetchGetPaymentMethods.fulfilled]: (state, action) => {
            state.isLoading = false
            if (!action.payload?.message) {
                state.paymentMethodsError = null
                state.dataPaymentMethods = action.payload
            } else {
                state.paymentMethodsError = action.payload
                state.dataPaymentMethods = null

            }
        },
        [fetchGetPaymentMethods.rejected]: (state) => {
            state.isLoading = false
            state.paymentMethodsError = 'error'
            state.dataPaymentMethods = null
        },
    }
})

export const categoriesReducer = categoriesSlice.reducer;