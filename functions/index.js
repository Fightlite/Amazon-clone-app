const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")('sk_test_51Jk9SuHZICw6bHl7Ofjh1CAOpRvDkdI2IoWgBDZzqJPW056JrNlQZCGqL71otJKj9uv5jyn4DCippcmw7HgwXJXs00XboN0XEc');

// App Config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get('/', (req, res) => res.status(200).send('Hello World!'));

app.post('/payment/create', async (req, res) => {
        const total = req.query.total;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'USD',
        });

        res.status(201).send({
            clientSecret: paymentIntent.client_secret,
        });
    });

// Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/app-2021-6189e/us-central1/api

