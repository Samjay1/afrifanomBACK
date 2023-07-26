
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const session = require('express-session');
const customerController = require('./controllers/customer')
const loanController = require('./controllers/loan')

const app = express();

let PORT = process.env.PORT || 4000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors({
    origin: '*'
}));


// users controllers
app.use('/', customerController)
app.use('/loan',loanController)


app.get('/', (req, res)=>{
  res.status(200).json({
      status: true,
      message:'Welcome to Company XYZ Microfinance'
    })
})


app.listen(PORT, console.log(`server on ${PORT}`))
