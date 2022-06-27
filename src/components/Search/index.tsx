import React, { ChangeEvent, useCallback, useRef,useState } from 'react'
import debounce from 'lodash.debounce'
import SearchImage from '../././../assets/img/SEARCH.svg'
import Close from '../././../assets/img/close.svg'
import { useDispatch} from 'react-redux'
import { setSearchValue } from '../../redux/filter/filterSlice'

const Search= () => {

const dispatch = useDispatch()
const inputRef =useRef<HTMLInputElement>(null)
const [value, setValue] = useState('')

  const onClickClear =(event:React.MouseEvent<HTMLImageElement>) => {
    console.log(event)
    setValue('')
    dispatch(setSearchValue(''))
    // document.querySelector('input').focus()
    inputRef.current?.focus()
  }
  const updateSearchValue=useCallback(debounce((str:string)=>{
    dispatch(setSearchValue(str))
  },150),
  []
  )

  const onChangeInput=(event:ChangeEvent<HTMLInputElement>)=>{
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div style={{
        display:'flex',
        border:'1px solid rgba(0,0,0,0.5 ',
        padding:'12px 20px',
        width: '300px',
        borderRadius:'10px',
        }}>
    <img src={SearchImage} alt="Search" style={{
        width:'24px',
        opacity:0.5
        }}/>

    <input style={{
      
         width: '280px',
        border:'none',
        fontSize:'16px',
        
    }}
    ref={inputRef}
    value={value}
    onChange={onChangeInput}
    placeholder="Szukaj..."
    />
    {value.length>0 && 
    <img src={Close} alt="Close" style={{
        width:'24px',
        opacity:0.5
        }}
        onClick={onClickClear}
        />}
    
    </div>
  )
}

export default Search