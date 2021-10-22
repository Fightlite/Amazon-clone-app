import React from 'react';
import '../styles/Home.css';
import { Product } from './'

const Home = () => {
    return (
        <div className="home">
            <div className="home__container">
                <img src="https://m.media-amazon.com/images/I/61ASx7NHTWL._SX3000_.jpg" alt="home" className="home__image"/>
            </div>
            <div className="home__row">
                <Product
                    id="590512"
                    title="2020 Apple iPad Air (10.9-inch, Wi-Fi, 64GB) - Space Gray (4th Generation)"
                    image="https://m.media-amazon.com/images/I/719UcXKzXHL._AC_SX679_.jpg"
                    price={499.99} 
                    rating={4}
                />
                <Product
                    id="590513"
                    title="2020 Apple MacBook Air Laptop: Apple M1 Chip, 13” Retina Display, 8GB RAM, 256GB SSD Storage"
                    image="https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SX679_.jpg"
                    price={849.99} 
                    rating={5}
                />
            </div>
            <div className="home__row">
                <Product
                    id="590514"
                    title="Apple iPhone 13 Pro (128GB, Sierra Blue)"
                    image="https://m.media-amazon.com/images/I/61jLiCovxVL._FMwebp__.jpg"
                    price={999.99} 
                    rating={4}
                />
                <Product
                    id="590515"
                    title="Apple AirPods Pro"
                    image="https://m.media-amazon.com/images/I/71zny7BTRlL._AC_SX679_.jpg"
                    price={199.99} 
                    rating={4}
                />
                <Product
                    id="5905156"
                    title="2021 Apple 11-inch iPad Pro (Wi-Fi, 128GB) - Space Gray"
                    image="https://m.media-amazon.com/images/I/81Y5WuARqpS._AC_SX679_.jpg"
                    price={1199.99} 
                    rating={5}
                />
            </div><div className="home__row">
                <Product
                    id="5905157"
                    title="SAMSUNG LC49RG90SSNXZA 49-Inch CRG9 Curved Gaming Monitor, Black, QHD, 120Hz
                    "
                    image="https://m.media-amazon.com/images/I/71tZW1aa+PL._AC_SX679_.jpg"
                    price={1160.51} 
                    rating={5}
                />
            </div>
        </div>
    )
}

export default Home;
