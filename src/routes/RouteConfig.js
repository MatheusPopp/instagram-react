import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import App from '../App';
import Login from '../components/Login';
import Logout from '../components/Logout';
import Timeline from '../components/Timeline';
import AuthenticationService from '../services/AuthenticationService';



class RouteConfig extends Component {

    constructor() {
        super();
    }


    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route exact path="/" component={Login}></Route>
                        <PrivateRoute path="/timeline" component={Timeline}></PrivateRoute>
                        <Route path="/logout" component={Logout}></Route>
                        <PrivateRoute component={Timeline}></PrivateRoute>
                    </Switch>
                </App>
            </Router>
        );
    }
}

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render = {(props) => (
        (AuthenticationService.isAuthenticated === true ?
            <Component {...props}></Component> 
            :
            <Redirect to='/'></Redirect>)
    )}></Route>
)

export default RouteConfig;