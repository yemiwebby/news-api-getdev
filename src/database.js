"use strict";
const sqlite3 = require('sqlite3').verbose();

class Db {

    constructor(file) {
        this.db = new sqlite3.Database(file);
        this.createUserTable();
        this.createNewsTable();
    }

    createUserTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS userAuth (
            id integer PRIMARY KEY,
            name text,
            email text UNIQUE,
            password text,
            bio text
        )`
        return this.db.run(sql);
    }

    createNewsTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS news (
            id integer PRIMARY KEY,
            title text,
            body text,
        )
        `
    }

    selectByEmail(email, callback) {
        return this.db.get(
            `SELECT * FROM userAuth WHERE email = ?`, [email], function (err, row) {
                callback(err, row)
            }
        )
    }

    insertUser(user, callback) {
        return this.db.run(
            'INSERT INTO userAuth (name, email, password, bio) VALUES (?,?,?,?)', user, (err) => {
                callback(err);
            }
        )
    }

    submitArticle(article, callback) {
        return this.db.run(
            'INSERT INTO news (title, body) VALUES (?,?)', article, (err) => {
                callback(err);
            }
        )
    }

    editArticle() {

    }

    deleteArticle(id, callback) {
        return this.db.run(

        )
    }

    viewArticles(article, callback) {
        return this.db.run(
            'SELECT * from news', [article], (err, row) => {
                callback(err, row);
            }
        )
    }

    viewArticle() {

    }

    viewWriter() {

    }


}

module.exports = Db;