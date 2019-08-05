import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from '../App';
import Login from '../components/Login';
import Logout from '../components/Logout';
import Timeline from '../components/Timeline';
import AuthenticationService from '../services/AuthenticationService';


const authenticationService = new AuthenticationService();
class RouteConfig extends Component {

    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route exact path="/" component={Login}></Route>
                        <PrivateRoute exact path="/timeline" component={Timeline}></PrivateRoute>
                        <Route path="/timeline/:login" component={Timeline}></Route>
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
        (authenticationService.isAuthenticated() === true ?
            <Component {...props}></Component> 
            :
            <Redirect to='/'></Redirect>)
    )}></Route>
)

export default RouteConfig;