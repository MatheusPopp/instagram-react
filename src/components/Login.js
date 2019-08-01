import React, { Component } from 'react';
import Header from './Header';
import Timeline from './Timeline';


class Login extends Component {

    //Propriedade login e senha não precisam ser guardados no 'this.state', pois não queremos que o componente renderize quando houver modificações nesses atributos
    constructor() {
        super();
        this.state = {msg: ''}

        this.login = '';
        this.senha= '';
    }

    logon = (e) => {
        e.preventDefault();

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({login: this.login.value, senha: this.senha.value}),
            headers: new Headers({
                'Content-type':'application/json'
            })
        };
       

        fetch('http://localhost:8080/api/public/login', requestInfo).then(result => {
            //200
            if(result.ok){
                return result.text();
            } else{
                throw new Error('Não foi possível realizar o login');
            }
        }).then(token => {
            localStorage.setItem('@instaReact/auth-token', token);
            this.props.history.push('/timeline');
        }).catch(error => {
            this.setState({msg: error.message})
        });

        
    }

    handleChange = (e) => {
        this[e.target.name] = e.target.value;
    }


    render() {
        const authToken = localStorage.getItem('@instaReact/auth-token');
        if(authToken != null) {   
            return(<Timeline></Timeline>)
        } else{
            return (
                <div>
                    <Header></Header>
                    <div className="login-box">
                        <h1 className="header-logo">InstaReact</h1>
                        <span>{this.state.msg}</span>
                        <form onSubmit={this.logon}>
                            <input name='login' ref={(input) => {this.login = input}} type="text"  required />
                            <input name='senha' ref={(input) => this.senha = input} type="password"  required />
                            <input type="submit" value="login" />
                        </form>
                    </div>
                </div>
                
            )
        }
        
    }
}

export default Login;