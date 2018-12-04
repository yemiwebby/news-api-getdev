const LocalStorage = require('node-localstorage').LocalStorage;
var localstorage = new LocalStorage('./token');


/**
 * @class AuthService
 * Token specific actions
 */
class AuthService {

    /**
     * @method saveTokenToStorage
     * @param {*} token
     */
    static saveTokenToStorage = (token) => {
        if (token) {
            localstorage.setItem('jwtToken', token);
            return token;
        }
    }

    /**
     * @method getTokenFromStorage
     */
    static getTokenFromStorage = () => {
        if (localStorage) { return localstorage.getItem('jwtToken') };
    }

    /**
     * Remove token from storage
     */
    static removeTokenFromStorage() {
        localStorage.removeItem('jwtToken');
    }
}

export default AuthService;