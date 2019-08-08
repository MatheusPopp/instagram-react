import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from '../App';
import Login from '../components/Login';
import Logout from '../components/Logout';
import Timeline from '../components/Timeline';
import AuthenticationService from '../services/AuthenticationService';

class RouteConfig extends Component {

    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route exact path="/" component={ (props) => <Login {...props} authenticationService = {AuthenticationService}></Login>}></Route>
                        <PrivateRoute exact path="/timeline" component={(props) =><Timeline {...props} authenticationService={AuthenticationService}></Timeline>} ></PrivateRoute>
                        <Route path="/timeline/:login" component={(props) =><Timeline {...props} authenticationService={AuthenticationService}></Timeline>}></Route>
                        <Route path="/logout" component={Logout}></Route>
                        <PrivateRoute component={(props) =><Timeline {...props} authenticationService={AuthenticationService}></Timeline>}></PrivateRoute>
                    </Switch>
                </App>
            </Router>
        );
    }
}

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} component = {(props) => (
        (AuthenticationService.isAuthenticated() === true ?
            <Component {...props}></Component> 
            :
            <Redirect to='/'></Redirect>)
    )}></Route>
)

export default RouteConfig;