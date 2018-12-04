import Users from '../controllers/users';
import signInValidator from '../middleware/signInValidator';
import auth from '../middleware/auth';


export default (app) => {
    app.post('/api/v1/auth/login', signInValidator, Users.signIn);
}