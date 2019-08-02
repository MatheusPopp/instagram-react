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

    pesquisa = (e) => {
    }

    logout = (e) => {
        e.preventDefault();
        this.props.history.push('/logout');
    }

    render() {
        return (
            <Header>
                <form className="header-busca" onSubmit={this.pesquisa}>
                    <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" /><input type="submit" value="Buscar" className="header-busca-submit" />
                    <button type="button" className="button-header" onClick={this.logout}>Sair</button>
                </form>

                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            <a href="#">
                            </a>
                        </li>
                    </ul>
                </nav>
            </Header>
        );
    }
}

export default withRouter(Header);