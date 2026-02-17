const db = require('../database');
const bcrypt = require('bcryptjs');
const saltrounds = 12;

const customers = {
    getAllCustomers(callback){
        return db.query("SELECT * FROM customers", callback);
    },

    getOneCustomer(un, callback){
        return db.query("SELECT * FROM customers WHERE username = ?",
            [un], callback);
    },

    add(newC, callback){
        bcrypt.hash(newC.password, saltrounds, function(err, hashedPassword){
            if(err){
                return callback(err.message);
            } else {
                return db.query("INSERT INTO customers VALUES(?,?,?,?)",
                    [
                        newC.username,
                        newC.fname,
                        newC.lname,
                        hashedPassword
                    ], callback);
            }
        });

    },

    update(un, newC, callback){
        bcrypt.hash(newC.password, saltrounds, function(err, hashedPassword){
            if(err) {
                return callback(err.message);
            } else {
                return db.query("UPDATE customers SET fname = ?, lname = ?, password = ? WHERE username = ?",
                    [newC.name, newC.lname, hashedPassword], callback);
            }
        });
    },

    updatePassword(un, newC, callback){
        bcrypt.hash(newC.password, saltrounds, function(err, hashedPassword){
            if(err){
                return callback(err.message);
            }  else{
                return db.query("UPDATE customers SET password = ? WHERE username = ?",
                    [hashedPassword, un], callback);
            }
        });
    },

    delete(un, callback){
        return db.query("DELETE FROM customers WHERE username = ?", [un], callback);
    },

    checkLogin(un, callback){
        return db.query("SELECT password FROM customers WHERE username = ?",[un], callback);
    }
}

module.exports = customers;