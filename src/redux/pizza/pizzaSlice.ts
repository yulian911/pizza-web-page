import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { PizzaItem, PizzaSlice, SearchPizzaParams, Status } from './types'



export const fetchPizzas = createAsyncThunk<PizzaItem[],SearchPizzaParams>(
  'pizza/fetchPizzaStatus',
  async (params) => {
    const {sortBy,order,category,search,currentPage,pizzaPerPage} =params

    const {data} =await axios.get<PizzaItem[]>(`https://62aa318f3b3143855443c048.mockapi.io/items?page=${currentPage}&limit=${pizzaPerPage}${category}&sortBy=${sortBy}&order=${order}${search}`)
    return data 
  }
)




const initialState :PizzaSlice = {
  items: [],
  status:Status.LOADING
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state,action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
})

export const { setItems} = pizzaSlice.actions

export default pizzaSlice.reducer