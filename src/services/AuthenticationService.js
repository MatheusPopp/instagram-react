export default class AuthenticationService {

    constructor() {}
    
    isAuthenticated = () => {
        return localStorage.getItem('@instaReact/auth-token') ? true : false;
    }

    authenticate = (token) => {
        localStorage.setItem('@instaReact/auth-token', token);
    }

    logout = () => {
        localStorage.removeItem('@instaReact/auth-token');
    }
}