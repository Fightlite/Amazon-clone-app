import React, { useState, useEffect } from 'react';
import '../styles/Payment.css';
import { useStateValue } from '../StateProvider';
import { CheckoutProduct } from './';
import { getCartTotal } from '../reducer';
import { db } from '../firebase';

import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format';
import axios from '../axios';

const address = {
    fullName: "Nhan Tran",
    phoneNumber: "+84909090909",
    country: "Vietnam",
    city: "Da Nang",
    district: "Hai Chau",
    street: "05 Hung Vuong"
}

const Payment = () => {
    const [{ cart, user }, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const [ error, setError] = useState(null);
    const [ disabled, setDisabled] = useState(true);
    const [ succeeded, setSucceeded] = useState(false);
    const [ processing, setProcessing] = useState("");
    const [ clientSecret, setClientSecret] = useState(true);
    
    useEffect(() => {
        // generate special stripe secret which allows us to charge customers
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //stripe expects the total in a currencies subunits
                url: `/payment/create?total=${getCartTotal(cart) * 100}`
            });
            setClientSecret( response.data.clientSecret );
        };

        getClientSecret();
    }, [cart]);
    
    const handleSubmit = async (e) => {
        // listen form is submitted
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment( clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent is payment confirmation
                db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    cart: cart,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_CART'
            })

            history.replace("/orders");
            // replace to orders component
        });

    };

    const handleChange = (e) => {
        // listen CardElement changes
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    };
    

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{cart?.length} items</Link>)
                </h1>

                {/* Address */}
                <div className="payment__section">
                    <h3 className="payment__title">Delivery Address</h3>
                    <div className="payment__address">
                        <p>Full Name: {address.fullName}</p>
                        <p>Phone Number: {address.phoneNumber}</p>
                        <p>Country: {address.country}</p>
                        <p>City: {address.city}</p>
                        <p>District: {address.district}</p>
                        <p>Street: {address.street}</p>
                        <button className="payment__button">Change Address</button>
                    </div>
                </div>

                {/* Review items */}
                <div className="payment__section">
                    <h3 className="payment__title">Review Items</h3>
                    <div className="payment__items">
                        {cart.map(item => {
                            return <CheckoutProduct {...item}/>
                        })}
                    </div>
                </div>

                {/* Payment method */}
                <div className="payment__section">
                    <h3 className="payment__title">Payment Method</h3>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    value={getCartTotal(cart)}
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    prefix={'$'}
                                    decimalScale={2}
                                    renderText={value => (
                                        <h3>Total Order: {value}</h3>
                                    )}
                                />
                                <button type="submit" className="payment__button" disabled={processing || disabled || succeeded}>
                                    <span>{ processing ? <p>Processing</p> : "Buy Now" }</span>
                                </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
