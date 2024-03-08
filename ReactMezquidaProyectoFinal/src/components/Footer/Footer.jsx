import "./footer.css"
//import img
import FaceIcon from '../../img/icons8-facebook-nuevo.svg'
import InstaIcon from '../../img/icons8-instagram.svg'
import TwitIcon from '../../img/icons8-twitter.svg'

function Footer() {
    return (
        <footer>
            <div className="redes">
                <h2>Seguinos en nuestras redes:</h2>
                <div className="redesFlex">
                    <div className="face">
                        <a href="https://www.facebook.com/"><img className="redes_icon" src={FaceIcon} alt="icono de facebook letra f blanco con fondo azul"/></a>
                    </div>
                    <div className="insta">
                        <a href="https://www.instagram.com/"><img className="redes_icon" src={InstaIcon} alt="icono instagram imagen de camara con fondo multicolor"/></a>
                    </div>
                    <div className="twitter">
                        <a href="https://www.twitter.com/"><img className="redes_icon" src={TwitIcon} alt="icono twitter pajaro volando en blanco y fondo azul"/></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer