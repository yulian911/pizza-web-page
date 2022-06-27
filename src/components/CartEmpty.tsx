import React, { FC } from 'react'
import cartEmptyImg from '../assets/img/empty-cart.png';
import {
 Link
  } from "react-router-dom";
const CartEmpty:FC = () => {
  return (
    <div className="cart cart--empty">
        <h2>
        Koszyk jest pusty<span>😕</span>
        </h2>
        <p>
        Prawdopodobnie nie zamówiłeś jeszcze pizzy.
        <br />
        Aby zamówić pizzę przejdź do strony głównej.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
        </Link>
  </div>
  )
}

export default CartEmpty