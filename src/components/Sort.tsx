
import React,{useState,useRef, useEffect, FC} from 'react'
import { useDispatch } from 'react-redux'
import { setSortId} from '../redux/filter/filterSlice'
// import { useWhyDidYouUpdate } from 'ahooks';

import { Sort, SortPropertyEnum } from '../redux/filter/types'

type SortItem = {
  name: string,
  sortProperty: SortPropertyEnum
}

type SortProps={
  value: Sort
}

export const sortList:SortItem[] = [
  { name: 'popolarne (DESC)', sortProperty:SortPropertyEnum.RATING_DESC},
  { name: 'popularne (ASC)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'cenna (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'cenna (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC},
  { name: 'alfabetycznie (DESC)', sortProperty:SortPropertyEnum.TITLE_DESC},
  { name: 'alfabetycznie (ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
];



 const SortPopup:FC<SortProps> =React.memo(({value})=>{
  // useWhyDidYouUpdate('SortPopup',{value})

  const dispatch=useDispatch()
  const[show,setShow]=useState<boolean>(false)
  const sortRef =useRef<HTMLDivElement>(null)
 

  const onClickListItem=(item:SortItem)=>{
      dispatch(setSortId(item))
      // onChangeSort(i),
      setShow(false) 
  }

  useEffect(() => {

    const handleClickOutside=(event:MouseEvent)=>{
      const _event  = event as MouseEvent & {
        path:Node[];
      }
      if(sortRef.current &&!_event.path.includes(sortRef.current)){
        setShow(false)
       }
    }
    document.body.addEventListener('click',handleClickOutside)

    return()=>{
      document.body.removeEventListener('click',handleClickOutside)
    }
  }, [])
  


    return (
      <div 
      ref={sortRef}
      className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b >Sortowanie po:</b>
        <span onClick={()=>setShow(true)}>{value?.name}</span>
      </div>
      
      <div className="sort__popup" >
      {show &&
        <ul>
          {sortList.map((item,i)=>{
            return(
              <li
              key={i}
              className={value?.sortProperty ===item.sortProperty ?'active':''}
              onClick={()=>onClickListItem(item)}
              >
                {item.name}
              </li>
            )
          })}
        </ul> 
      }
      </div>
      
    </div>
    )
  })

  export default SortPopup