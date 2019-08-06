import AuthenticationService from "./AuthenticationService";
import PubSub from 'pubsub-js';

export default class FotoService {

    constructor() {
        this.authenticationService = new AuthenticationService();
    }

    like = (idFoto) => {
        const requestInfo = {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        return (fetch(`http://localhost:8080/api/fotos/${idFoto}/like?X-AUTH-TOKEN=${this.authenticationService.token}`, requestInfo).then(result => {
            if (result.ok) {
                return result.json();
            }
            else {
                throw new Error("não foi possível realizar o like da foto");
            }
        }).then(like => {
            PubSub.publish('atualizaLike', {likeInfo: like, idFoto: idFoto});
            return like;
        }));
    }

    comenta = (idFoto, comentario) => {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({texto: comentario}),
            headers: new Headers({
                'Content-type':'application/json'
            })
        };

        return (fetch(`http://localhost:8080/api/fotos/${idFoto}/comment?X-AUTH-TOKEN=${this.authenticationService.token}`, requestInfo).then(result => {
            if(result.ok){
                return result.json();
            } else{
                console.log(result);
            }
        }).then(comentarioInfo => {
            PubSub.publish('atualizaComentario', {comentarioInfo: comentarioInfo, idFoto: idFoto});
            return comentarioInfo;
        }));
    }

    verificaLikeUsuario = (likers) => {
        if(likers && typeof(likers) === 'object') {
            return likers.some(x => x.login === this.authenticationService.userName);   
        }
        return false;
    }








}