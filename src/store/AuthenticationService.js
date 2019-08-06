export default class AuthenticationService {

    get token () {
        return localStorage.getItem('@instaReact/auth-token');
    }

    get userName() {
        return this.token ? this._jwt_decode(this.token).sub : undefined;
    }

    isAuthenticated = () => {
        return this.token ? true : false;
    }

    authenticate = (token) => {
        localStorage.setItem('@instaReact/auth-token', token);
    }

    logon = (login, senha) => {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({login: login, senha: senha}),
            headers: new Headers({
                'Content-type':'application/json'
            })
        };
       
        return (fetch('http://localhost:8080/api/public/login', requestInfo).then(result => {
            //200
            if(result.ok){
                return result.text();
            } else{
                throw new Error('Não foi possível realizar o login');
            }
        }).then(token => {
            localStorage.setItem('@instaReact/auth-token', token);
            return token;
        }).catch(error => {
            return error;
        }));
    }

    logout = () => {
        localStorage.removeItem('@instaReact/auth-token');
    }

    _jwt_decode = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };
}