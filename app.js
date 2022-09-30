const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const contactRoutes = require('./routes/contact')
const userRoutes = require('./routes/users')

//Server setup
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const secret = process.env.CONNECTION_STRING;
const port = process.env.PORT;



//Database Connection
mongoose.connect(secret);
let connStatus = mongoose.connection;

connStatus.on('open',()=>console.log('Database is Connected'))

//app routes

app.use('/contact', contactRoutes);
app.use('/users', userRoutes);



//Gateway response

app.listen(port,()=> console.log(`Server is running on port ${port}`));
