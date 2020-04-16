require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

//import routes
const authRoute = require('./routes/auth');
const userRoutes = require('./routes/user');

//app middlewares
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))


//routes middleware
app.use('/api', authRoute);
app.use('/api', userRoutes);

mongoose.connect(process.env.DATABASE, {  useNewUrlParser: true, useUnifiedTopology: true })
   .then(
     () => console.log('Connected to DB'))
   .catch(
     (error) => console.log(error));

const Port = process.env.PORT || 8080;
app.listen(Port, () => console.log(`Listening to ${Port}`));
