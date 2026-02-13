const express = require('express');
const router = express.Router();

const products = require('../models/products_model');

router.get('/', function(request, response){
    products.getAll(function(err, result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    });
});

router.get('/:id', function(request, response){
    products.getOne(request.params.id, function(err, result){
        if(err){
            response.send(err);
        } else {
            response.json(result[0]);
        }
    });
});


router.post('/', function(request, response){
    products.add(request.body, function(err, result){
        if (err) {
            response.send(err);
        } else {
            response.json(result);
        }
    });
});

router.put('/:id', function(request, response){
    products.update(request.params.id, request.body, function(err, result){
        if(err) {
            response.send(err);
        } else {
            response.json(result);
        }
    });
});

router.delete('/:id', function(request, response){
    products.delete(request.params.id, function(err, result){
        if (err) {
            response.send(err);
        } else {
            response.json(result);
        }
    });
})

module.exports = router;