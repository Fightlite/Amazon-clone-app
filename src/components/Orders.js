import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import '../styles/Orders.css';
import { useStateValue } from '../StateProvider';
import { Order } from './';


const Orders = () => {
    const [{ cart, user }] = useStateValue();
    const [ orders, setOrders] = useState([]);

    useEffect(() => {
        if(user) {
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => {
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        } else {
            setOrders([]);
        }
    }, [user]);

    return (
        <div className="orders">
            <h1 className="orders__title">Your Orders</h1>
            <div className="orders__order">
                { orders.map(order => (
                    <Order order={order}/>
                ))}
            </div>
            
        </div>
    )
}

export default Orders
