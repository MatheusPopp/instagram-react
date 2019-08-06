import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PubSub from 'pubsub-js'



class Header extends Component {

    render() {
        return (
            <header className="foto-header">

                <figure className="foto-usuario">
                    <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
                        <img src={this.props.foto.urlPerfil} alt="foto do usuario" />
                        <figcaption className="foto-usuario">
                            {this.props.foto.loginUsuario}
                        </figcaption>
                    </Link>
                </figure>

                <time className="foto-data">{this.props.foto.horario}</time>
            </header>
        );

    }
}

class Info extends Component {

    render() {
        return (
            <div className="foto-info">
                <div className="foto-info-likes">
                    {
                        this.props.foto.likers.map(liker => {
                            return <Link to={`/timeline/${liker.login}`} key={liker.login}> {liker.login} </Link>
                        })
                    }
                    {
                        this.props.foto.likers && this.props.foto.likers.length > 1 ? 'curtiram' : this.props.foto.likers.length === 1 ? 'curtiu' : undefined
                    }
                </div>

                {
                    this.props.foto.comentario ?
                        <p className="foto-info-legenda">
                            <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
                                {this.props.foto.loginUsuario}
                            </Link>
                             <span> {this.props.foto.comentario}</span>
                        </p>
                        :
                        ''
                }
                <ul className="foto-info-comentarios">
                    {
                        this.props.foto.comentarios && this.props.foto.comentarios.length > 0 ?
                            this.props.foto.comentarios.map(comentario => {
                                return <li className="comentario" key={comentario.id}>
                                    <Link to={`/timeline/${comentario.login}`} className="foto-info-autor">{comentario.login} </Link>
                                     {comentario.texto}
                                </li>
                            })
                            :
                            ''
                    }
                </ul>
            </div>
        );
    }
}

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {likeada : this.props.fotoService.verificaLikeUsuario(this.props.foto.likers), comentario: ''};
    }

    like = (e) => {
        e.preventDefault();
        this.props.fotoService.like(this.props.foto.id);
        this.setState({ likeada: !this.state.likeada });
    }

    comenta = (e) => {
        e.preventDefault();
        this.props.fotoService.comenta(this.props.foto.id, this.state.comentario.value);
        this.state.comentario.value = '';
    }

    render() {
        const component = this.props.authenticationService.isAuthenticated() ?
            <section className="fotoAtualizacoes">
                <div onClick={this.like} className={this.state.likeada ? "fotoAtualizacoes-like-ativo" : "fotoAtualizacoes-like"}>Likar</div>
                <form className="fotoAtualizacoes-form" onSubmit={this.comenta}>
                    <input name="comentario" type="text" placeholder="Adicione um comentário..." ref={input => this.state.comentario = input } className="fotoAtualizacoes-form-campo" />
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
                </form>
            </section> : null;
        return (component);
    }
}

class Foto extends Component {


    render() {
        return (
            <div className="foto">
                <Header {...this.props} ></Header>
                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />
                <Info {...this.props}></Info>
                <Footer {...this.props} ></Footer>
            </div>
        );
    }
}

export default withRouter(Foto);