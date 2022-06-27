

export type ICartItem ={
    id:string,
    count:number,
    title:string,
    type:string,
    size:number,
    imageUrl:string,
    price:number
}
export interface ICardSlice{
totalPrice:number,
items:ICartItem[]
}