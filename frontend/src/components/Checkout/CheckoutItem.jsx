import React,{useContext} from 'react'
import { ShopContext } from "../Ecom/EcomContext"

export const CheckoutItem = (props) => {
    const { id, productName, price, productImage } = props.data;
    const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext)
  return (
    <div className='cartItem'>
        <img src={`http://localhost:8000/images/${productImage}`} alt="" />
        <div className='description'>
            <p><b>{productName}</b></p>
            <p>${price}</p>
            <div className="countHandler">
                <button onClick={() => removeFromCart(id)}> - </button>
                <input value={cartItems [id]} onChange={(e) =>updateCartItemCount(e.target.value) } />
                <button onClick={() => addToCart(id)}> + </button>
            </div>
        </div>
    </div>
  )
}
