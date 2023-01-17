import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchGetOperations = createAsyncThunk('operations/get', async (params) => {
    const { data } = await axios.get('/app/operation', {
        params
    });
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
    dataError: null,
    totalCountData: 0,
    isLoading: false,
    isLoadingMonthExpense: true,
    isLoadingMonthRevenue: true,
    isLoadingOperations: true,
    isLoadingTodayExpense: true,
    isLoadingTotalCash: true,
    isLoadingYearExpense: true,
    todayExpense: 0,
    todayExpenseError: null,
    totalCash: 0,
    totalCashError: null,
    monthExpense: {},
    monthExpenseError: null,
    monthRevenue: {},
    monthRevenueError: {},
    yearExpense: [],
    yearExpenseError: null,
    minExpense: {},
    maxExpense: {}
}

const operationsSlice = createSlice({
    name: 'operations',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchGetOperations.pending]: (state) => {
            state.isLoadingOperations = true
            state.data = []
            state.dataError = null
        },
        [fetchGetOperations.fulfilled]: (state, action) => {
            state.isLoadingOperations = false
            if (action.payload?.message) {
                state.data = []
                state.totalCountData = 0
                state.dataError = action.payload
            } else {
                state.data = action.payload.operations
                state.totalCountData = action.payload.totalCount
                state.dataError = null
            }
        },
        [fetchGetOperations.rejected]: (state) => {
            state.isLoadingOperations = false
            state.data = []
            state.totalCountData = 0
            state.dataError = 'error'
        },
        [fetchGetTodayExpense.pending]: (state) => {
            state.isLoadingTodayExpense = true
            state.todayExpense = 0
            state.todayExpenseError = null
        },
        [fetchGetTodayExpense.fulfilled]: (state, action) => {
            state.isLoadingTodayExpense = false
            if (action.payload?.message) {
                state.todayExpense = 0
                state.todayExpenseError = action.payload
            } else {
                state.todayExpense = action.payload
                state.todayExpenseError = null
            }
        },
        [fetchGetTodayExpense.rejected]: (state) => {
            state.isLoadingTodayExpense = false
            state.todayExpense = 0
            state.todayExpenseError = 'error'
        },
        [fetchGetTotalCash.pending]: (state) => {
            state.isLoadingTotalCash = true
            state.totalCash = 0
            state.totalCashError = null
        },
        [fetchGetTotalCash.fulfilled]: (state, action) => {
            state.isLoadingTotalCash = false
            if (action.payload?.message) {
                state.totalCash = 0
                state.totalCashError = action.payload
            } else {
                state.totalCash = action.payload
                state.totalCashError = null
            }
        },
        [fetchGetTotalCash.rejected]: (state) => {
            state.isLoadingTotalCash = false
            state.totalCash = 0
            state.totalCashError = 'error'
        },
        [fetchGetMontExpense.pending]: (state) => {
            state.isLoadingMonthExpense = true
            state.monthExpense = {}
            state.monthExpenseError = null
        },
        [fetchGetMontExpense.fulfilled]: (state, action) => {
            state.isLoadingMonthExpense = false
            if (action.payload?.message) {
                state.monthExpense = {}
                state.monthExpenseError = action.payload
            } else {
                state.monthExpense = action.payload
                state.monthExpenseError = null
            }
        },
        [fetchGetMontExpense.rejected]: (state) => {
            state.isLoadingMonthExpense = false
            state.monthExpense = {}
            state.monthExpenseError = 'error'

        },
        [fetchGetMontRevenue.pending]: (state) => {
            state.isLoadingMonthRevenue = true
            state.monthRevenue = {}
            state.monthRevenueError = null
        },
        [fetchGetMontRevenue.fulfilled]: (state, action) => {
            state.isLoadingMonthRevenue = false
            if (action.payload?.message) {
                state.monthRevenue = {}
                state.monthRevenueError = action.payload
            } else {
                state.monthRevenue = action.payload
                state.monthRevenueError = null
            }
        },
        [fetchGetMontRevenue.rejected]: (state) => {
            state.isLoadingMonthRevenue = false
            state.monthRevenueError = 'error'
            state.monthRevenue = {}
        },
        [fetchGetYearExpense.pending]: (state) => {
            state.isLoadingYearExpense = true
            state.yearExpense = {}
            state.yearExpenseError = null
            state.minExpense = {}
            state.maxExpense = {}
        },
        [fetchGetYearExpense.fulfilled]: (state, action) => {
            state.isLoadingYearExpense = false
            if (action.payload?.message) {
                state.yearExpense = []
                state.minExpense = {}
                state.maxExpense = {}
                state.yearExpenseError = action.payload
            } else {
                state.yearExpense = action.payload
                const array = [...action.payload]
                let sorted = array.sort((a, b) => a.amount - b.amount)
                state.minExpense = sorted[0]
                state.maxExpense = sorted[sorted.length - 1]
                state.yearExpenseError = null
            }
        },
        [fetchGetYearExpense.rejected]: (state) => {
            state.isLoadingYearExpense = false
            state.yearExpense = {}
            state.yearExpenseError = 'error'
        },
    }
})

export const operationsReducer = operationsSlice.reducer;
export const { clearOneOperation } = operationsSlice.actions;
