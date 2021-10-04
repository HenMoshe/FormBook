///!DA4d5gJaVh*C.-    henadmin
const mongoose = require('mongoose');
require('dotenv').config()
const dotenv = require('dotenv')
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const connectionstring = `mongodb+srv://henadmin:!DA4d5gJaVh*C.-@cluster0.7yafy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
exports.connect = async function connect() {
  try {
    await mongoose.connect(connectionstring, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    },
      //err=>{if (err) throw err}
    )
    console.log('mongo-connected')
  }
  catch (error) {
    console.error('not connected', error.message)
  }
}