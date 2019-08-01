import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Timeline from './components/Timeline';
import Login from './components/Login';
import history from './components/History'

ReactDOM.render(

    <Router history={history} >
        <App>
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route path="/timeline" component={Timeline}></Route>
            </Switch>
        </App>
    </Router>
, document.getElementById('root'));
