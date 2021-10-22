import React from 'react';
import '../styles/Order.css';
import moment from 'moment';
import CurrencyFormat from "react-currency-format";
import { CheckoutProduct } from "./";

const Order = ({order}) => {
    return (
        <div className="order">
            <h2>Order</h2>
            <p className="order__moment">{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <small>Id: {order.id}</small>
            </p>

            {order.data.cart.map(item => (
                <CheckoutProduct {...item} hideButton/>
            ))}

            <CurrencyFormat
                value={order.data.amount / 100}
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'$'}
                decimalScale={2}
                renderText={value => (
                    <h3 className="order__total">Total Order: {value}</h3>
                )}
            />
        </div>
    )
}

export default Order
