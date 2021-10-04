const express = require('express')
const { connect } = require('./DB')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const path = require('path')
const userRouter = require('./userRouter')
const formRouter = require('./formRouter')
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
connect()
    .then(() => {
        userRouter(app)
        formRouter(app)
        app.listen(3001 || process.env.PORT)
    })
