import {List} from 'immutable';
import {LIST, LIKE, COMMENT, SEARCH} from '../actionsType/timelineActionsType';


//Método para modificar o state, preservando a imutabilidade
function changeState(state, idFoto, callback) {
    const fotoEstadoAntigo = state.find(x => x.id === idFoto);
    //Retorno novo objeto copiado do estado atual, porém mantendo o estado atual intacto
    const fotoEstadoAtual = Object.assign({}, fotoEstadoAntigo, callback(fotoEstadoAntigo));
    const index = state.findIndex(foto => foto.id === idFoto);
    const newState = state.set(index, fotoEstadoAtual);
    return newState;
}

//REDUCER
export function timelineReducer(state = [], action) {
    if (action.type === LIST || action.type === SEARCH) {
        return new List(action.payload);
    }

    if (action.type === COMMENT) {
        return changeState(state, action.payload.idFoto, (fotoEstadoAntigo) => {
            const novosComentarios = fotoEstadoAntigo.comentarios.concat(action.payload.novoComentario);
            return {comentarios: novosComentarios};
        });
    }

    if (action.type === LIKE) {
        return changeState(state, action.payload.idFoto, (fotoEstadoAntigo) => {
            let likeada;
            let likers = fotoEstadoAntigo.likers;
            const isLiked = likers.find(x => x.login === action.payload.like.login);
    
            let novosLikers;
            if (!isLiked) {
                novosLikers = likers.concat(action.payload.like);
                likeada = true;
            } else {
                novosLikers = likers.filter(x => x.login !== action.payload.like.login);
                likeada = false;
            }
            return {likeada, likers: novosLikers};
        })
    }

    return [];
}