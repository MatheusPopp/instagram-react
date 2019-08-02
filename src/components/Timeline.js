import React, { Component } from 'react';
import Foto from './Foto';
import {TimelineHeader} from './Header';
import {withRouter} from 'react-router-dom';


class Timeline extends Component {

    render() {
        return (

            <div className="main">
                <TimelineHeader {...this.props}></TimelineHeader>
                <TimelineContainer {...this.props}></TimelineContainer>
            </div> 
        );
    }
}

class TimelineContainer extends Component {
    constructor(props){
        super(props);
        this.state = {fotos: []};
    }
 
    componentDidMount(){
        const login = this.props.match.params['login'];

        let urlPerfil = !login ? `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('@instaReact/auth-token')}` : `http://localhost:8080/api/public/fotos/${login}`;
       
        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => {
            this.setState({fotos:fotos});
            });  
    }

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => {
                        return <div key={foto.id}><Foto foto={foto}></Foto></div>
                    })
                }
            </div>
        )
            
    }
}

export default withRouter(Timeline);

