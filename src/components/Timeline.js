import React, { Component } from 'react';
import Foto from './Foto';
import { TimelineHeader } from './Header';
import { withRouter } from 'react-router-dom';
import Pubsub from 'pubsub-js'
import AuthenticationService from '../services/AuthenticationService';
import { CSSTransitionGroup } from 'react-transition-group';
import FotoService from '../services/FotoService';
import TimelineService from '../services/TimelineService';


class Timeline extends Component {

    constructor() {
        super();
        this.authenticationService = new AuthenticationService();
        this.fotoService = new FotoService();
        this.timelineService = new TimelineService();
    }

    render() {
        return (

            <div className="main">
                <TimelineHeader {...this.props} authenticationService={this.authenticationService} fotoService={this.fotoService} timelineService={this.timelineService}></TimelineHeader>
                <TimelineContainer {...this.props} authenticationService={this.authenticationService}  fotoService={this.fotoService} timelineService={this.timelineService}></TimelineContainer>
            </div>
        );
    }
}

class TimelineContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { fotos: [] };

        Pubsub.subscribe('atualiza-dados', (topico, info) => {
            this.obtemDados();
        });

        Pubsub.subscribe('updateTimeline', (topico, fotos) => {
            this.setState({fotos});
        });

    }

    componentDidMount() {
        this.props.timelineService.obtemDados(this.props.match.params['login']).then(fotos => {
            if(fotos){
                this.setState({ fotos: fotos });            
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.login !== this.props.match.params.login) {
            this.props.timelineService.obtemDados(this.props.match.params['login']).then(fotos => {
                if(fotos){
                    this.setState({ fotos: fotos });            
                }
            });
        }
    }

    render() {
        return (
            <div className="fotos container">
                <CSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto => {
                            return <div key={foto.id}><Foto foto={foto} {...this.props}></Foto></div>
                        })
                    }
                </CSSTransitionGroup>

            </div>
        )

    }
}

export default withRouter(Timeline);

