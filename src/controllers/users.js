import jwt from 'jsonwebtoken';
import AuthService from '../service/authService';


/**
 * @class User
 */
class Users {

    static signIn = (req, res) => {
        const user = {
            username: req.body.username,
            password: req.body.password,
        }

        if (user) {
            const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 10 });
            AuthService.saveTokenToStorage(token);
            res.status(200).json({
                message: 'Logged in successfully'
            })
        }
    }
}

export default Users;
