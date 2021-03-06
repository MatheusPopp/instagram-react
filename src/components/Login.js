import React, { Component } from 'react';
import Header from './Header';
import Timeline from './Timeline';
import AuthenticationService from '../services/AuthenticationService';


class Login extends Component {

    //Propriedade login e senha não precisam ser guardados no 'this.state', pois não queremos que o componente renderize quando houver modificações nesses atributos
    constructor(props) {
        super(props);
        this.state = { msg: '' }
        this.login = '';
        this.senha = '';
    }

    logon = (e) => {
        e.preventDefault();
        AuthenticationService.logon(this.login.value, this.senha.value).then(token => {
            if (token) {
                this.props.history.push('/timeline');
            }
        });
    }


    render() {
        const authToken = localStorage.getItem('@instaReact/auth-token');
        if (authToken != null) {
            return (<Timeline {...this.props}></Timeline>)
        } else {
            return (
                <div>
                    <Header></Header>
                    <div className="login-box">
                        <h1 className="header-logo">InstaReact</h1>
                        <span>{this.state.msg}</span>
                        <form onSubmit={this.logon}>
                            <input name='login' ref={(input) => { this.login = input }} type="text" required />
                            <input name='senha' ref={(input) => this.senha = input} type="password" required />
                            <input type="submit" value="login" />
                        </form>
                    </div>
                </div>

            )
        }

    }
}

export default Login;