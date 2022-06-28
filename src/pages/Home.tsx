
import React ,{ useEffect,useState,useRef, FC, useCallback} from 'react'
import axios from 'axios'
// import qs from 'qs'
// import { useNavigate } from 'react-router-dom'
import { Skeleton,PaginationContainer ,PizzaBlock,Categories,SortPopup} from '../components'
import { useSelector } from 'react-redux'
import { setCategoryId,} from '../redux/filter/filterSlice'
import { fetchPizzas} from '../redux/pizza/pizzaSlice'
import { filterSelector } from '../redux/filter/selector'
import { pizzaSelector } from '../redux/pizza/selector'
import { useAppDispatch } from '../redux/store'
// import { SearchPizzaParams } from '../redux/pizza/types'


const Home:FC = () => {
    const {categoryId,sort,currentPage,searchValue}=useSelector(filterSelector)
    const {items,status} =useSelector(pizzaSelector)
    
    const [pizzaPerPage] = useState<number>(4);
    const [pizzaItems,setPizzaItems]=useState<number>(0)


    // const navigate =useNavigate()

    // redux
    const dispatch=useAppDispatch()
    const isSearch=useRef(false)
    // const isMounted=useRef(false)

    const getPizzas =async() => {
      const sortBy = sort.sortProperty.replace('-', '');
      const order =  sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const category =categoryId >0 ?`&category=${categoryId}`:''
      const search = searchValue.length > 0 ?`&search=${searchValue} `:''
  
        dispatch(
         
          fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage:String(currentPage),
          pizzaPerPage:String(pizzaPerPage)
        }))

    const resPizza = await axios.get(`https://62aa318f3b3143855443c048.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`)
    setPizzaItems(resPizza.data.length)  

  window.scrollTo(0,0)
 
}

    // useEffect(() => {
    //   if(window.location.search){
    //     const params=(qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams

    //     const sort = sortList.find(list=>list.sortProperty===params.sortBy)
    

    //     dispatch(setFilters({
    //       searchValue:params.search,
    //       categoryId:Number(params.category),
    //       currentPage:Number(params.currentPage),
    //       sort: sort || sortList[0]
    //     }))
    //     isSearch.current=true
    //   }
    // }, [])
    

  useEffect(() => {



    if(!isSearch.current){
      getPizzas()
    }
    isSearch.current=false

  }, [categoryId,sort,searchValue,currentPage])

  // useEffect(() => {
  //   // do zmiany URL/
  //   if(isMounted.current){
  //     const queryString =qs.stringify({
  //       sortProperty:sort.sortProperty,
  //       categoryId,
  //       currentPage
  //     })
  //     navigate(`?${queryString}`)
  //   }
  //   isMounted.current=true
  // }, [categoryId,sort,currentPage])
  


  const skeletons =  [...new Array(6)].map((_,index)=><Skeleton key={index}/>)
  const itemsPizza =items.map((item:any)=><PizzaBlock key={item.id} {...item}/>)

  // wariant statyczny 
  // const items =pizzas.filter(item=>{
  //   if(item.title.toLowerCase().includes(value.toLowerCase())){
  //     return true
  //   }
  //   return false
  // }).map((item)=><PizzaBlock key={item.id}  item={item}/>)


  const onChangeCategory=useCallback((i:number)=>{
    dispatch(setCategoryId(i))
  },[])
  return (
    <div className="content">
        <div className="container">
          <div className="content__top">
            {/* categories */}
            <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
              {/* sort  */}
            <SortPopup value={sort}/>
          </div>
          <h2 className="content__title">Wszystkie</h2>
          {status==='error'? 
          <div className="content__error-info">
            <h2>Brak pizz</h2>
            <p>
              Probłem z wczytaniem pizz,sprubój pozniej.
            </p>
          </div>
          :
          <div className="content__items">{status==='loading' ? skeletons: itemsPizza}</div>
        }
          
        </div>
        <PaginationContainer 
            // item={items} 
            pizzaItems={pizzaItems}
            pizzaPerPage={pizzaPerPage}
            />

      </div>
  )
}

export default Home