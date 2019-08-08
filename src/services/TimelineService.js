import AuthenticationService from "./AuthenticationService";
import { list, like, comment, search } from '../actions/timelineAction';
import { alert } from '../actions/headerAction';

export default class TimelineService {

    static list = (login) => {
        return (dispatch => {
            let urlPerfil = !login ? `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${AuthenticationService.token}` : `http://localhost:8080/api/public/fotos/${login}`;
            fetch(urlPerfil)
                .then(response => response.json())
                .then(fotos => {
                    dispatch(list(fotos));
                    return fotos;
                })
        }
        );
    }


    static search = (filter) => {
        return dispatch => {
            (fetch(`http://localhost:8080/api/public/fotos/${filter}`).then(result => {
                if (result.ok) {
                    return result.json();
                } else {
                    throw new Error('Usuário não encontrado');
                }
            }).then(result => {
                if (result && result.length > 0) {
                    dispatch(search(result));
                    return result;
                } else {
                    dispatch(alert('Usuário não encontrado'));
                    return false;
                }
            }).catch(error => {
                dispatch(alert('Usuário não encontrado'));
                return false;
            }))
        };
    }

    static like = (idFoto) => {

        return (dispatch => {
            const requestInfo = {
                method: 'POST',
                headers: new Headers({
                    'Content-type': 'application/json'
                })
            };

            return (fetch(`http://localhost:8080/api/fotos/${idFoto}/like?X-AUTH-TOKEN=${AuthenticationService.token}`, requestInfo).then(result => {
                if (result.ok) {
                    return result.json();
                }
                else {
                    throw new Error("não foi possível realizar o like da foto");
                }
            }).then(likeInfo => {
                dispatch(like({ idFoto: idFoto, like: likeInfo }));
                return likeInfo;
            }));
        })

    }

    static comment = (idFoto, comentario) => {
        return (dispatch => {
            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({ texto: comentario }),
                headers: new Headers({
                    'Content-type': 'application/json'
                })
            };
            return (fetch(`http://localhost:8080/api/fotos/${idFoto}/comment?X-AUTH-TOKEN=${AuthenticationService.token}`, requestInfo).then(result => {
                if (result.ok) {
                    return result.json();
                } else {
                    console.log(result);
                }
            }).then(novoComentario => {
                dispatch(comment({ idFoto: idFoto, novoComentario: novoComentario }));
                return novoComentario;
            }));
        })

    }


}