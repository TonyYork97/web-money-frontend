import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const minDate = moment().add(-11, 'M').startOf('M').format('YYYY-MM-DD');
const maxDate = moment().format('YYYY-MM-DD')

const initialState = {
  typeOfPayment: '',
  minDateValue: '',
  maxDateValue: '',
  minAmountValue: 0,
  maxAmountValue: 999999999.99,
  page: 1,
  totalPages: 0
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTypeOfPaymentOperation: (state, action) => {
      state.typeOfPayment = action.payload
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
  }
})

export const { setTypeOfPaymentOperation, setMinDateValue, setMaxDateValue, setMinAmountValue, setMaxAmountValue, setTotalPages, setPage } = filterSlice.actions;
export const filterReducer = filterSlice.reducer