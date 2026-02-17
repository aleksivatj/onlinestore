const express = require('express');
const app = express();
const port = 3000;
const productsRouter = require('./routes/products');
const customersRouter = require('./routes/customers');
const loginRouter = require('./routes/login');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

app.use(express.json());
dotenv.config();

app.get('/', function(request, response){
    response.send("Verkkokauppa API");
});

app.use('/login', loginRouter);
app.use('/products', productsRouter);
app.use('/customers', customersRouter);

app.listen(port, function(){
    console.log("Palvelin kuuntelee porttia: "+ port);
});

function authenticateToken(request, response, next){
    const authHeader = request.headers['authorization'];

    if(!authheader) {
        return response.sendStatus
    }
}

module.exports = app;