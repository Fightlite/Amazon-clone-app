import './App.css';
import { Header, Home, Checkout, Login, Payment, Orders } from './components';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51Jk9SuHZICw6bHl7JzDJUfeZWuPjLkxb3KB6QLN8lZ8RM4iulaUP4XHS0KMX986cHrWGeElQ0eJYdWlR7StwkLxF00AeWfzp7c');

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      
      if (authUser) {
        // User is signed in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        // User is signed out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, []);

  return (
    <Router>
      <div className="App">
        
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
