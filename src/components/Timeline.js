import React, { Component } from 'react';
import Foto from './Foto';
import { TimelineHeader } from './Header';
import { withRouter } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import TimelineService from '../services/TimelineService';
import store from '../store/index';



class Timeline extends Component {

    render() {
        return (

            <div className="main">
                <TimelineHeader {...this.props} store = {store}></TimelineHeader>
                <TimelineContainer {...this.props} store = {store}></TimelineContainer>
            </div>
        );
    }
}

class TimelineContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { fotos: [] };
        this.props.store.subscribe((fotos) => { this.setState({ fotos: this.props.store.getState().timeline }); });
    }

    componentDidMount() {
        this.props.store.dispatch(TimelineService.list(this.props.match.params['login']));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.login !== this.props.match.params.login) {
            this.props.store.dispatch(TimelineService.list(this.props.match.params['login']));
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

