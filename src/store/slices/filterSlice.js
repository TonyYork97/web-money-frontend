import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typeOfPayment: '',
  type: '',
  minDateValue: '',
  maxDateValue: '',
  minAmountValue: 0,
  maxAmountValue: 999999999.99,
  page: 1,
  totalPages: 0,

  curCategory: '',
  curCategoryAmount: 0,
  activeCategory: 0,
  isOpen: false,

  updateFlag: true
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setUpdateFlag: (state, action) => {
      state.updateFlag = action.payload
    },
    setTypeOfPaymentOperation: (state, action) => {
      state.typeOfPayment = action.payload
    },
    setTypeOperation: (state, action) => {
      state.type = action.payload
    },
    setMinDateValue: (state, action) => {
      state.minDateValue = action.payload
    },
    setMaxDateValue: (state, action) => {
      state.maxDateValue = action.payload
    },
    setMinAmountValue: (state, action) => {
      state.minAmountValue = action.payload
    },
    setMaxAmountValue: (state, action) => {
      state.maxAmountValue = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload
    },
    setCurCategory: (state, action) => {
      state.curCategory = action.payload
    },
    setCurCategoryAmount: (state, action) => {
      state.curCategoryAmount = action.payload
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload
    },
  }
})

export const {
  setTypeOfPaymentOperation,
  setTypeOperation,
  setMinDateValue,
  setMaxDateValue,
  setMinAmountValue,
  setMaxAmountValue,
  setTotalPages,
  setPage,
  setCurCategory,
  setCurCategoryAmount,
  setActiveCategory,
  setIsOpen,
  setUpdateFlag
} = filterSlice.actions;
export const filterReducer = filterSlice.reducer