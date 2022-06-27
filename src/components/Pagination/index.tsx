import React from 'react'
import { Pagination ,Stack} from '@mui/material'
import { useDispatch } from 'react-redux'
import { setCurrentPage } from '../../redux/filter/filterSlice'


type PaginationContainerProps={
  pizzaPerPage:number,
  pizzaItems:number ,
}

const PaginationContainer = ({pizzaPerPage,pizzaItems }:PaginationContainerProps) => {
  const dispatch=useDispatch()
    
  
    const paginate =(_event:React.ChangeEvent<unknown>,value:number)=>{
      // console.log(event)
      dispatch(setCurrentPage(value))
    // console.log(value)
    //   window.scrollTo({top:1800,behavior:'smooth'})
    }
  

 
  return (
    <Stack mt="100px" alignItems={'center'} >
      
            <Pagination 
            color='standard'
            shape='rounded'
            defaultPage={1}
            // count={pizzaPerPage}
            count={Math.ceil(pizzaItems /pizzaPerPage)}
            // page={currentPage}
            onChange={paginate}
            
            />
        
      </Stack>
  )
}

export default PaginationContainer