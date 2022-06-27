

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
  }

export type PizzaItem ={
    id:string,
    count:number,
    title:string,
    types:number[],
    sizes:number[],
    imageUrl:string,
    price:number
}
export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
    pizzaPerPage:string;
  };

export interface PizzaSlice{
    items:PizzaItem[],
    status:Status
}