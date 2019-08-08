import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import TimelineService from '../services/TimelineService';
import AuthenticationService from '../services/AuthenticationService';
import {connect} from 'react-redux';


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


class TimelineHeaderBasic extends Component {

    constructor(props) {
        super(props);
        this.filter = '';
    }

    search = (e) => {
        e.preventDefault();
        this.props.search(this.filter.value);
    }

    logout = (e) => {
        e.preventDefault();
        AuthenticationService.logout();
        this.props.history.push('/logout');
    }

    render() {
        return (   
            <Header>
                <form className="header-busca" onSubmit={this.search}>
                    <span className="error-message">{this.props.msg}</span>
                    <input type="text" name="search" placeholder="Pesquisa" ref={(input)=> this.filter = input} className="header-busca-campo" />
                    <input type="submit" className="header-busca-submit" />
                    {AuthenticationService.isAuthenticated() ? <button type="button" className="button-header" onClick={this.logout}>Sair</button> : ''}
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


const mapStateToProps = (store) => {
    return {msg: store.header}
};

const mapDispatchToProps = (dispatch) => {
    return {
        search: (login) => {
            dispatch(TimelineService.search(login));
        }
    }
};

export const TimelineHeader = connect(mapStateToProps, mapDispatchToProps) (TimelineHeaderBasic);


export default withRouter(Header);