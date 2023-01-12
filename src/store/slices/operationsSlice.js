import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchGetOperations = createAsyncThunk('operations/get', async (params) => {
    const { data } = await axios.get('/app/operation', {
        params
    });
    if ('totalCount' in data) {
        window.localStorage.setItem('totalCount', data.totalCount)
    }
    return data
})

export const fetchGetTodayExpense = createAsyncThunk('operations/todayExpense', async () => {
    const { data } = await axios.get('/app/operation/stat/today-expense');
    return data
})

export const fetchGetTotalCash = createAsyncThunk('operations/totalCash', async () => {
    const { data } = await axios.get('/app/operation/stat/total-cash');
    return data
})

export const fetchGetMontExpense = createAsyncThunk('operations/MonthExpense', async (params) => {
    const { data } = await axios.get('/app/operation/stat/month-expense', {
        params
    });
    return data
})

export const fetchGetMontRevenue = createAsyncThunk('operations/MonthRevenue', async (params) => {
    const { data } = await axios.get('/app/operation/stat/month-revenue', {
        params
    });
    return data
})
export const fetchGetYearExpense = createAsyncThunk('operations/yearExpense', async () => {
    const { data } = await axios.get('/app/operation/stat/year-expense');
    return data
})


const initialState = {
    data: [],
    totalCountData: 0,
    isLoading: false,
    isLoadingMonthExpense: true,
    isLoadingMonthRevenue: true,
    isLoadingOperations: true,
    isLoadingTodayExpense: true,
    isLoadingTotalCash: true,
    isLoadingYearExpense: true,
    todayExpense: 0,
    totalCash: 0,
    monthExpense: {},
    monthRevenue: {},
    yearExpense: [],
    minExpense: {},
    maxExpense: {}
}

const operationsSlice = createSlice({
    name: 'operations',
    initialState,
    reducers: {
        clearOneOperation: (state) => {
            state.operation = {}
        }
    },
    extraReducers: {
        [fetchGetOperations.pending]: (state) => {
            state.isLoadingOperations = true
            state.data = []
        },
        [fetchGetOperations.fulfilled]: (state, action) => {
            state.isLoadingOperations = false
            state.data = action.payload.operations
            state.totalCountData = action.payload.totalCount
        },
        [fetchGetOperations.rejected]: (state) => {
            state.isLoadingOperations = false
            state.data = []
        },
        [fetchGetTodayExpense.pending]: (state) => {
            state.isLoadingTodayExpense = true
            state.todayExpense = 0
        },
        [fetchGetTodayExpense.fulfilled]: (state, action) => {
            state.isLoadingTodayExpense = false
            state.todayExpense = action.payload
        },
        [fetchGetTodayExpense.rejected]: (state) => {
            state.isLoadingTodayExpense = false
            state.todayExpense = 0
        },
        [fetchGetTotalCash.pending]: (state) => {
            state.isLoadingTotalCash = true
            state.totalCash = 0
        },
        [fetchGetTotalCash.fulfilled]: (state, action) => {
            state.isLoadingTotalCash = false
            state.totalCash = action.payload
        },
        [fetchGetTotalCash.rejected]: (state) => {
            state.isLoadingTotalCash = false
            state.totalCash = 0
        },
        [fetchGetMontExpense.pending]: (state) => {
            state.isLoadingMonthExpense = true
            state.monthExpense = {}
        },
        [fetchGetMontExpense.fulfilled]: (state, action) => {
            state.monthExpense = action.payload
            state.isLoadingMonthExpense = false
        },
        [fetchGetMontExpense.rejected]: (state) => {
            state.isLoadingMonthExpense = false
            state.monthExpense = {}
        },
        [fetchGetMontRevenue.pending]: (state) => {
            state.isLoadingMonthRevenue = true
            state.monthRevenue = {}
        },
        [fetchGetMontRevenue.fulfilled]: (state, action) => {
            state.monthRevenue = action.payload
            state.isLoadingMonthRevenue = false
        },
        [fetchGetMontRevenue.rejected]: (state) => {
            state.isLoadingMonthRevenue = false
            state.monthRevenue = {}
        },
        [fetchGetYearExpense.pending]: (state) => {
            state.isLoadingYearExpense = true
            state.yearExpense = {}
        },
        [fetchGetYearExpense.fulfilled]: (state, action) => {
            state.isLoadingYearExpense = false
            state.yearExpense = action.payload
            const array = [...action.payload]
            let sorted = array.sort((a, b) => a.amount - b.amount)
            state.minExpense = sorted[0]
            state.maxExpense = sorted[sorted.length - 1]
        },
        [fetchGetYearExpense.rejected]: (state) => {
            state.isLoadingYearExpense = false
            state.yearExpense = {}
        },
    }
})

export const operationsReducer = operationsSlice.reducer;
export const { clearOneOperation } = operationsSlice.actions;
