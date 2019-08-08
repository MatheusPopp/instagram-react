import { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';

class Logout extends Component {

    componentDidMount() {
        this.logout();
    }

    logout = () => {
        AuthenticationService.logout();
        this.props.history.push('/');
    }

    render() {
        return null;
    }
}

export default Logout;