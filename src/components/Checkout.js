import React from 'react';
import '../styles/Checkout.css';
import { Subtotal } from './';
import { useStateValue } from '../StateProvider';
import { CheckoutProduct } from './';


const Checkout = () => {
    const [ {cart}, dispatch] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <div>
                    <h2 className="checkout__title">{ cart.length > 0 ? 'Your Amazon Cart' : 'Your Amazon Cart is empty.'}</h2>
                    {cart.map(item => {
                        return <CheckoutProduct {...item}/>
                    })}
                </div>
            </div>

            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
