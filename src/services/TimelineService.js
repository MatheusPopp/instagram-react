import AuthenticationService from "./AuthenticationService";

export default class TimelineService {

    constructor() {
        this.authenticationService = new AuthenticationService();
    }

    obtemDados = (login) => {
        let urlPerfil = !login ? `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${this.authenticationService.token}` : `http://localhost:8080/api/public/fotos/${login}`;

        return (fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => {
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
}