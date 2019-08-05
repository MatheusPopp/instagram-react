import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Pubsub from 'pubsub.js'


class Header extends Component {

    render() {
        return (
            <header className="header container">

                <Link to={'/timeline'}>
                    <h1 className="header-logo">

                        InstaReact
                    </h1>
                </Link>

                <div>
                    {this.props.children}
                </div>
            </header>
        )
    }

}


export class TimelineHeader extends Component {

    constructor(){
        super();
        this.filter = '';
    }

    pesquisa = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/public/fotos/${this.filter.value}`).then(result => {
            if(result.ok){
                return result.json();
            } else{
                throw new Error('Usuário não encontrado');
            }
        }).then(result => {
            if(result && result.length > 0){
                this.props.history.push(`/timeline/${this.filter.value}`);
            } else{
                alert('Usuário não encontrado');
            }
        }).catch(error => {
            console.log(error);
        });
    }

    logout = (e) => {
        e.preventDefault();
        this.props.history.push('/logout');
    }

    render() {
        return (
            <Header>
                <form className="header-busca" onSubmit={this.pesquisa}>
                    <input type="text" name="search" placeholder="Pesquisa" ref={(input)=> this.filter = input} className="header-busca-campo" />
                    <input type="submit" className="header-busca-submit" />
                    {this.props.authenticationService.isAuthenticated() ? <button type="button" className="button-header" onClick={this.logout}>Sair</button> : ''}
                </form>

                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            
                        </li>
                    </ul>
                </nav>
            </Header>
        );
    }
}

export default withRouter(Header);