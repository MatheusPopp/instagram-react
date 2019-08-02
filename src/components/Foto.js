import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';



class Header extends Component {

    constructor(props) {
        super(props);
    }
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
                            return <a href="#" key={liker.login}>{liker.login} </a>
                        })
                    }
                    {
                        this.props.foto.likers && this.props.foto.likers.length > 0 ? 'curtiram' : ''
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
                                    <Link to={`/timeline/${comentario.login}`}><a className="foto-info-autor">{comentario.login} </a></Link>
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

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a href="#" className="fotoAtualizacoes-like">Likar</a>
                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" />
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
                </form>
            </section>
        );
    }
}

class Foto extends Component {

    render() {
        return (
            <div className="foto">
                <Header {...this.props}></Header>
                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />
                <Info foto={this.props.foto}></Info>
                <Footer></Footer>
            </div>
        );
    }
}

export default withRouter(Foto);