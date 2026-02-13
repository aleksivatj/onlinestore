const db = require('../database');

const products = {
    getAll(callback){
        return db.query("SELECT * FROM products", callback);
    },
    getOne(idProduct, callback){
        return db.query("SELECT * FROM products WHERE id_products = ?",
        [idProduct], callback);
    },
    add(newP, callback){
        return db.query("INSERT INTO products (name, price, saldo) VALUES (?, ?, ?)",
                [
                newP.name,
                newP.price,
                newP.saldo
                ], callback);
    }
}

module.exports = products;