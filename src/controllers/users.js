import jwt from 'jsonwebtoken';
import AuthService from '../service/authService';
const bcrypt = require('bcryptjs');
import DB from '../database';
import { stat } from 'fs';
// const DB = require('./');

const db = new DB('sqlitedb');


/**
 * @class User
 */
class Users {

    static register = (req, res) => {
        res.status(200).json({ message: "Right here for now" });
        // db.insert([
        //     req.body.name, req.body.email, bcrypt.hashSync(req.body.password, 8), req.body.bio
        // ], (err) => {
        //     if (err) return res.status(500).send("There was a problem registering the user")
        //     db.selectByEmail(req.body.email, (err, user) => {
        //         if (err) return res.status(500).send("There was a problem getting user")
        //         let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 10 });
        //         res.status(200).json({ auth: true, token, user });
        //     })
        // })
    }

    static signIn = (req, res) => {

        db.selectByEmail(req.body.email, (err, user) => {
            if (err) return res.status(500).send("Error on the server.");
            if (!user) return res.status(404).send('No user found');
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
            let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 10 })
            AuthService.saveTokenToStorage(token);
            res.status(200).json({ auth: true, token: token, user: user, message: "Logged in successfully" });
        })
        // const user = {
        //     username: req.body.username,
        //     password: req.body.password,
        // }

        // if (user) {
        //     const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 10 });
        //     AuthService.saveTokenToStorage(token);
        //     res.status(200).json({
        //         message: 'Logged in successfully'
        //     })
        // }
    }
}

export default Users;
