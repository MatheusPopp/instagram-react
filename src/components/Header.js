import React, { Component } from 'react';
import history from './History'
import {withRouter} from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <header className="header container">
                <h1 className="header-logo">
                    InstaReact
            </h1>
                <div>
                    {this.props.children}
                </div>
            </header>
        )
    }

}


export class TimelineHeader extends Component {
    
    pesquisa = (e) => {
        e.preventDefault();
        this.props.history.push('/');;
    }
    
    render() {
        return (
            <Header>
                <form className="header-busca" onSubmit={this.pesquisa}>
                    <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" /><input type="submit" value="Buscar" className="header-busca-submit" />
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