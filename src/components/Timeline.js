import React, { Component } from 'react';
import Foto from './Foto';
import { TimelineHeader } from './Header';
import { withRouter } from 'react-router-dom';
import Pubsub from 'pubsub-js'
import { CSSTransitionGroup } from 'react-transition-group';

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
    constructor() {
        super();
        this.state = { fotos: [] };
        Pubsub.subscribe('updateTimeline', (topico, fotos) => {
            this.setState({fotos: fotos});
        });

    }

    componentDidMount() {
        this.props.store.obtemDados(this.props.match.params['login']);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.login !== this.props.match.params.login) {
            this.props.store.obtemDados(this.props.match.params['login']);
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
                            return <div key={foto.id}><Foto foto={foto} {...this.props} ></Foto></div>
                        })
                    }
                </CSSTransitionGroup>

            </div>
        )

    }
}

export default withRouter(Timeline);

