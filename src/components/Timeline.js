import React, { Component } from 'react';
import Foto from './Foto';
import { TimelineHeader } from './Header';
import { CSSTransitionGroup } from 'react-transition-group';
import TimelineService from '../services/TimelineService';
import {connect} from 'react-redux';




class Timeline extends Component {


    render() {
        return (

            <div className="main">
                <TimelineHeader {...this.props} ></TimelineHeader>
                <TimelineContainer {...this.props} ></TimelineContainer>
            </div>
        );
    }
}

class TimelineContainer extends Component {

    componentDidMount() {
        this.props.list(this.props.match.params['login']);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.login !== this.props.match.params.login) {
            this.props.list(this.props.match.params['login']);
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
                        this.props.fotos.map(foto => {
                            return <div key={foto.id}><Foto foto={foto} {...this.props} ></Foto></div>
                        })
                    }
                </CSSTransitionGroup>

            </div>
        )

    }
}
const mapStateToProps = (store) => {
    return {fotos: store.timeline}
};

const mapDispatchToProps = (dispatch) => {
    return {
       list : (login) => {
           dispatch(TimelineService.list(login));
        }, 
        like: (idFoto) => {
            dispatch(TimelineService.like(idFoto));
        },
        comment: (idFoto, comment) => {
            dispatch(TimelineService.comment(idFoto, comment));
        }
   }
}

const TimelineConnected = connect(mapStateToProps, mapDispatchToProps) (Timeline);


export default TimelineConnected;

