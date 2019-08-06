import AuthenticationService from "./AuthenticationService";
import PubSub from 'pubsub-js';

export default class TimelineStore{

    constructor(fotos) {
        this.authenticationService = new AuthenticationService();
        this.fotos = fotos;
    }

    obtemDados = (login) => {
        let urlPerfil = !login ? `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${this.authenticationService.token}` : `http://localhost:8080/api/public/fotos/${login}`;

        return (fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => {
                this.fotos = fotos;
                PubSub.publish('updateTimeline', this.fotos);
                return fotos;
            }));
    }


    pesquisa = (filter) => {
        return (fetch(`http://localhost:8080/api/public/fotos/${filter}`).then(result => {
            if(result.ok){
                return result.json();
            } else{
                throw new Error('Usuário não encontrado');
            }
        }).then(result => {
            if(result && result.length > 0){
                PubSub.publish('updateTimeline', result);
                return result;
            } else{
                alert('Usuário não encontrado');
                return false;
            }
        }).catch(error => {
            console.log(error);
            return false;
        }));
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
            let foto = this.fotos.find(x => x.id === idFoto)
            let likers = foto.likers;
            const isLiked = likers.find(x => x.login === like.login);

            if (!isLiked) {
                likers.push(like);
            } else {
                likers = likers.filter(x => x.login !== like.login);;
            }
            foto.likers = likers;
            PubSub.publish('updateTimeline', this.fotos);
            return like;
        }));
    }

    comenta = (idFoto, comentario) => {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ texto: comentario }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        return (fetch(`http://localhost:8080/api/fotos/${idFoto}/comment?X-AUTH-TOKEN=${this.authenticationService.token}`, requestInfo).then(result => {
            if (result.ok) {
                return result.json();
            } else {
                console.log(result);
            }
        }).then(comentarioInfo => {
            let comentarios = this.fotos.find(x => x.id === idFoto).comentarios;
            comentarios.push(comentarioInfo);
            PubSub.publish('updateTimeline', this.fotos);
            return comentarioInfo;
        }));
    }

    verificaLikeUsuario = (likers) => {
        if (likers && typeof (likers) === 'object') {
            return likers.some(x => x.login === this.authenticationService.userName);
        }
        return false;
    }
}