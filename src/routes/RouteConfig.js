import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from '../App';
import Login from '../components/Login';
import Logout from '../components/Logout';
import Timeline from '../components/Timeline';
import AuthenticationService from '../services/AuthenticationService';
import store from '../store/index';
import {Provider} from 'react-redux';

class RouteConfig extends Component {
    render() {
        return (
            <Router>
                <Provider store={store}>
                    <App>
                        <Switch>
                            <Route exact path="/" component={ (props) => <Login {...props}></Login>}></Route>
                            <PrivateRoute exact path="/timeline" component={(props) =><Timeline {...props}></Timeline>} ></PrivateRoute>
                            <Route path="/timeline/:login" component={(props) =><Timeline {...props}></Timeline>}></Route>
                            <Route path="/logout" component={Logout}></Route>
                            <PrivateRoute component={(props) =><Timeline {...props}></Timeline>}></PrivateRoute>
                        </Switch>
                    </App>
                </Provider>
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

export default (RouteConfig);