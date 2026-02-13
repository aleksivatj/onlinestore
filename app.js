const express = require('express');
const app = express();
const port = 3000;
const productsRouter = require('./routes/products');
const customersRouter = require('./routes/customers');

app.use(express.json());

app.get('/', function(request, response){
    response.send("Verkkokauppa API");
});

app.use('/products', productsRouter);
app.use('/customers', customersRouter);

app.listen(port, function(){
    console.log("Palvelin kuuntelee porttia: "+ port);
});

module.exports = app;