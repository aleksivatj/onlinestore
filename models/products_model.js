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
    },
    update(idP, newP, callback){
        return db.query("UPDATE products set name = ?, price = ?, saldo = ? WHERE id_products = ?",
        [
            newP.name,
            newP.price,
            newP.saldo,
            idP
        ], callback);
    },
    delete(idP, callback){
        return db.query("DELETE FROM products WHERE id_products = ?",
        [idP], callback);
    }
}

module.exports = products;