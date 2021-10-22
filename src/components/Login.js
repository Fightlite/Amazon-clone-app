import React, { useState } from 'react';
import '../styles/Login.css';
import { Link, useHistory } from "react-router-dom";

import 'firebase/app';
import { auth } from '../firebase';


const Login = () => {
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const history = useHistory();

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then((authUser) => {
            // Signed in 
            const user = authUser.user;

            if(user){
                history.push("/");
            }

            })
            .catch((error) => alert(error.message));
    }

    const register = (e) => {
        e.preventDefault();
        
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
            // Register
            const user = authUser.user;

            if(user){
                history.push("/");
            }
            
            })
            .catch((error) => alert(error.message));
    }

    return (
        <div className="login">
            <Link to="/">
                <img src="http://pngimg.com/uploads/amazon/amazon_PNG6.png" alt="amazon-logo" className="login__logo"/>
            </Link>

            <div className="login__container">
                <h1>Sign-In</h1>
                <form>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        onClick={signIn} 
                        className="login__signInButton"
                    >Sign In
                    </button>
                </form>
                <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
            </div>

            <div className="login__register">
                <p>New to Amazon?</p>
                <button onClick={register} className="login__registerButton">Create your Amazon account</button>
            </div>
            
        </div>
    )
}

export default Login;