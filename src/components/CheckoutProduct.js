import React from 'react';
import '../styles/CheckoutProduct.css';
import { useStateValue } from '../StateProvider';


const CheckoutProduct = ({ id, title, image, price, rating, hideButton }) => {
    const [state, dispatch] = useStateValue();

    const RemoveItem = () => {
        dispatch({
            type: 'REMOVE_ITEM',
            id: id,
        })
    }

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} alt=""/>

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price"><strong>${price}</strong></p>
                <div className="checkoutProduct__rating">
                    {Array(rating).fill().map((_, i) => (
                        <p>⭐</p>
                    ))}
                </div>
                {!hideButton && (
                <button onClick={RemoveItem} >Remove Item</button>
                )}
            </div>
        </div>
    )
}

export default CheckoutProduct
