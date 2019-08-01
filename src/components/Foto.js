import React, { Component } from 'react';


class Header extends Component {
    render() {
        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={this.props.imgSrc} alt="foto do usuario" />
                    <figcaption className="foto-usuario">
                        <a href="#">
                            {this.props.loginUsuario}
                    </a>
                    </figcaption>
                </figure>
                <time className="foto-data">{this.props.horario}</time>
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
                        this.props.foto.likers && this.props.foto.likers.length > 0 ? 'curtiram': ''    
                    }
                </div>

                {
                    this.props.foto.comentario ?  
                        <p className="foto-info-legenda"><a className="foto-info-autor">{this.props.foto.loginUsuario} </a>{this.props.foto.comentario}</p> 
                        : 
                        ''
                }
                <ul className="foto-info-comentarios">
                    {
                        this.props.foto.comentarios && this.props.foto.comentarios.length > 0 ?
                            this.props.foto.comentarios.map(comentario => {
                                return <li className="comentario" key={comentario.id}>
                                            <a className="foto-info-autor">{comentario.login} </a>
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
        return(
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

export default class Foto extends Component {

    render() {
        return (
            <div className="foto">
                <Header imgSrc={this.props.foto.urlPerfil} loginUsuario={this.props.foto.loginUsuario} horario={this.props.foto.horario}></Header>
                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />
                <Info foto={this.props.foto}></Info>
                <Footer></Footer>        
            </div>
        );
    }
}