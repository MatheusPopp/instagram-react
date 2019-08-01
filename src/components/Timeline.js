import React, { Component } from 'react';
import Foto from './Foto';
import Header, {TimelineHeader} from './Header';
import {withRouter} from 'react-router-dom';
import Login from './Login';


class Timeline extends Component {

    render() {
        return (

            <div className="main">
                <TimelineHeader history={this.props.history}></TimelineHeader>
                <TimelineContainer></TimelineContainer>
            </div> 
        );
    }
}

class TimelineContainer extends Component {
    constructor(){
        super();
        this.state = {fotos: []};
    }
 
    componentDidMount(){
        fetch(`http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('@instaReact/auth-token')}`)
            .then(response => response.json())
            .then(fotos => {
                this.setState({fotos:fotos});
            });
    }

    render() {
        if(localStorage.getItem('@instaReact/auth-token')) {
            return (
                <div className="fotos container">
                    {
                        this.state.fotos.map(foto => {
                            return <div key={foto.id}><Foto foto={foto}></Foto></div>
                        })
                    }
                </div>
            )
        } else {
            return(<Login></Login>)
        }
    }
}

export default withRouter(Timeline);

