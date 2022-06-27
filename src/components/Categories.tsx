
import React,{FC} from 'react'
// import { useWhyDidYouUpdate } from 'ahooks';
  // useWhyDidYouUpdate('Categories',{value,onChangeCategory})
const categories =['Wszystkie','Mięsne','Vege','Grill','Ostre','Zamknęte']

type CategoryProps={
  value: number,
  onChangeCategory:(index:number)=>void
}

const Categories:FC<CategoryProps> = React.memo(({value,onChangeCategory}) => {

  return (

          <div className="categories">
          <ul>
            {categories.map((item ,index:number)=>(
                <li key={index} className={value ===index ? 'active':''} onClick={()=>onChangeCategory(index)}>{item} </li>

            ))}
          
          </ul>
        </div>
  

  )
})

export default Categories