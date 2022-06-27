import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage'
import { ICardSlice, ICartItem } from './types'

const {items,totalPrice}=getCartFromLocalStorage()


const initialState :ICardSlice = {
  totalPrice,
  items,
  
 
}

export const cartSlice =createSlice({
    name:'cart',
    initialState,
    reducers:{
        // addItems(state,action){
        //    state.items.push(action.payload)
        // //    dodawanie ceny 
        // // state.totalPrice= [...state.items,action.payload]
        // state.totalPrice= state.items.reduce((sum,obj)=>{
        //     return obj.price+sum
        // },0)
        addItems(state,action:PayloadAction<ICartItem>){
            const findItem =state.items.find(obj => obj.id===action.payload.id)
            if(findItem){
                findItem.count++
            } else{
                state.items.push({
                  ...action.payload, 
                  count:1
                })
            }
             state.totalPrice= calcTotalPrice(state.items)
        },
        minusItem(state,action:PayloadAction<string>){
            const findItem =state.items.find(obj => obj.id===action.payload)
            
            if(findItem){
                findItem.count--
            }
        },
        removeItems(state,action:PayloadAction<string>){
            state.items= state.items.filter((item)=>item.id!==action.payload)
          
         },
        clearItems(state){
            state.items =[]
            state.totalPrice =0
        },
    }
})

export const {addItems,removeItems,clearItems,minusItem} = cartSlice.actions
export default cartSlice.reducer