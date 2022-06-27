import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSlice, SortPropertyEnum,Sort } from './types'




const initialState:FilterSlice = {
  searchValue:'',
  categoryId:0,
  currentPage:1,
  sort:{
    name:'popularne',
    sortProperty:SortPropertyEnum.RATING_DESC,
  }
}

export const filterSlice =createSlice({
    name:'filters',
    initialState,
    reducers:{
        setCategoryId(state,action:PayloadAction<number>){
            // console.log(action)
            state.categoryId = action.payload
        },
        setSearchValue(state,action:PayloadAction<string>){
         
          state.searchValue = action.payload
      },
        setSortId(state,action:PayloadAction<Sort>){
            state.sort=action.payload
        },
        setCurrentPage(state,action:PayloadAction<number>){
          state.currentPage=action.payload
        },
        // setFilters(state,action:PayloadAction<FilterSlice>){
        //   state.currentPage=Number(action.payload.currentPage);
        //   state.categoryId = Number(action.payload.categoryId);
        //   state.sort = action.payload.sort;
        // }
        setFilters(state, action: PayloadAction<FilterSlice>) {
          if (Object.keys(action.payload).length) {
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sort;
          } else {
            state.currentPage = 1;
            state.categoryId = 0;
            state.sort = {
              name: 'popularne',
              sortProperty: SortPropertyEnum.RATING_DESC,
            };
          }
        },
        
    }
})


export const {setCategoryId,setSortId,setCurrentPage,setFilters,setSearchValue} = filterSlice.actions
export default filterSlice.reducer