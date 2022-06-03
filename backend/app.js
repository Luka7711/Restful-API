const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// loads .env variables to process.env
dotenv.config()

mongoose.connect(process.env.DB_CONNECT, () => console.log('connected to DB'));

const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comment');

// express.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.
// Without `express.json()`, `req.body` is undefined.
app.use(express.json())

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/comment', commentRoute);

app.listen(9000, () => console.log('Server listens on port 3000'))