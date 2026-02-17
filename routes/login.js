const express = require('express');
const customer = require('../models/customers_model');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', function(request, response){
    const username = request.body.username;
    const password = request.body.password;
    if(username && password) {
        customer.checkLogin(username, function(err, result){
            if(err) {
                response.send(err);
            }
            else {
                if(result.length > 0) {
                    bcrypt.compare(password, result[0].password, function(err, compareResult){
                        if(err) {
                            response.send(err);
                        }
                        else {
                            if(compareResult) {
                                const token = createToken(username);
                                response.json(token);
                            }
                            else {
                                console.log("Väärä salasana");
                                response.status(403).json("Tunnus ja salasana eivät täsmää");
                            }
                        }
                    });
                } else {
                    console.log("Tunnusta ei ole.");
                    response.status(403).json("Tunnus ja salasana eivät täsmää");

                }
            }
        });
    }
    else {
        console.log("Tunnus tai salasana puuttuu.");
        response.status(403).json("Tunnus ja salasana eivät täsmää");
    }
});

function createToken(username){
    return jwt.sign({username}, process.env.MY_TOKEN,{expiresIn:'1200s'});
}

module.exports = router;