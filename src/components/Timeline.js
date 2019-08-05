import React, { Component } from 'react';
import Foto from './Foto';
import {TimelineHeader} from './Header';
import {withRouter} from 'react-router-dom';
import Pubsub from 'pubsub.js'
import AuthenticationService from '../services/AuthenticationService';



class Timeline extends Component {

    constructor () {
        super();
        this.authenticationService = new AuthenticationService();
    }

    render() {
        return (

            <div className="main">
                <TimelineHeader {...this.props} authenticationService={this.authenticationService}></TimelineHeader>
                <TimelineContainer {...this.props} authenticationService={this.authenticationService}></TimelineContainer>
            </div> 
        );
    }
}

class TimelineContainer extends Component {
    constructor(props){
        super(props);
        this.state = {fotos: []};

        Pubsub.subscribe('atualiza-dados',(topico, info) => {
            this.obtemDados();
        });

        Pubsub.subscribe('timeline', function(topico, fotos){
            console.log(fotos);
        });
        
    }
 
    componentDidMount(){
         this.obtemDados();      
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params.login !== this.props.match.params.login){
            this.obtemDados(); 
        }
    }

    obtemDados = () => {
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
                        return <div key={foto.id}><Foto foto={foto} authenticationService={this.props.authenticationService}></Foto></div>
                    })
                }
            </div>
        )
            
    }
}

export default withRouter(Timeline);

