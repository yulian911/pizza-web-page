import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Data ={
  id:string,
  imageUrl  :string,
  title:string,
  types:[number],
  sizes:[number],
  price:number,
  category:string,
  rating:number,

}

const FullPizza:FC = () => {
    const{id} =useParams()
    const [datas, setData] = useState<Data >()
    const [unMouted, setUnMouted] = useState(true)
    console.log(id)
    const fetchIdItem =async()=>{
        try{
            const {data} = await axios.get(`https://62aa318f3b3143855443c048.mockapi.io/items/${id}`)
            setData(data)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        if(unMouted){
            fetchIdItem()
            setUnMouted(false)
        }
    
      return () => {
        setUnMouted(true)
      }
    }, [])
    

  return (
    <div className='container'>
        <img src={datas?.imageUrl}/>
        <h2>{datas?.title}</h2>
       <p>Lorem ipsum dolor sit amet, consectetur adip </p>
       <h4>
        {datas?.price} PLN
       </h4>
    </div>
  )
}

export default FullPizza