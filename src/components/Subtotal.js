import React from 'react';
import '../styles/Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../StateProvider';
import { getCartTotal } from '../reducer';
import { useHistory } from 'react-router-dom';

const Subtotal = () => {
    const [ { cart }, dispatch] = useStateValue();
    const history = useHistory();

    return (
        <div className="subtotal">
            <CurrencyFormat
                value={getCartTotal(cart)}
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'$'}
                decimalScale={2}
                renderText={value => (
                    <>
                        <p>
                            Subtotal ( {cart?.length} items ): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
            />
            
            <button onClick={() => history.push("/payment")}>Proceed to checkout</button>
        </div>
    )
};

export default Subtotal;
