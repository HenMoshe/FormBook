const express = require('express')
require('dotenv').config()
const { connect } = require('./DB')
const cookieParser = require('cookie-parser')
const path = require('path')
const userRouter = require('./userRouter')
const formRouter = require('./formRouter')
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
  next();
});
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
connect()
    .then(() => {
        userRouter(app)
        formRouter(app)
        app.listen(process.env.PORT, '0.0.0.0')
        console.log(process.env.PORT)
    })
