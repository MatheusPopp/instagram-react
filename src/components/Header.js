import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

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
        this.props.store.pesquisa(this.filter.value);
    }

    logout = (e) => {
        e.preventDefault();
        this.props.authenticationService.logout();
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