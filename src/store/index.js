import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/authSlice'
import { operationsReducer } from './slices/operationsSlice'
import { categoriesReducer } from './slices/categoriesSlice'
import { filterReducer } from './slices/filterSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        operations: operationsReducer,
        categories: categoriesReducer,
        filter: filterReducer
    }
})

export default store