import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from '../App';
import Login from '../components/Login';
import Logout from '../components/Logout';
import Timeline from '../components/Timeline';
import AuthenticationService from '../store/AuthenticationService';
import TimelineStore from '../store/TimelineStore';


const authenticationService = new AuthenticationService();
const timelineStore = new TimelineStore([]);

class RouteConfig extends Component {

    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route exact path="/" component={ (props) => <Login {...props} store={timelineStore} authenticationService = {authenticationService}></Login>}></Route>
                        <PrivateRoute exact path="/timeline" component={(props) =><Timeline {...props} store={timelineStore} authenticationService={authenticationService}></Timeline>} ></PrivateRoute>
                        <Route path="/timeline/:login" component={(props) =><Timeline {...props} store={timelineStore} authenticationService={authenticationService}></Timeline>}></Route>
                        <Route path="/logout" component={Logout}></Route>
                        <PrivateRoute component={(props) =><Timeline {...props} store={timelineStore} authenticationService={authenticationService}></Timeline>}></PrivateRoute>
                    </Switch>
                </App>
            </Router>
        );
    }
}

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} component = {(props) => (
        (authenticationService.isAuthenticated() === true ?
            <Component {...props}></Component> 
            :
            <Redirect to='/'></Redirect>)
    )}></Route>
)

export default RouteConfig;