import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';

class Logout extends Component {


    constructor(props) {
        super(props);
        this.authenticationService = new AuthenticationService();
        this.logout();
    }

    logout = () => {
        this.authenticationService.logout();
        this.props.history.push('/');
    }

    render() {
        return null;
    }
}

export default Logout;