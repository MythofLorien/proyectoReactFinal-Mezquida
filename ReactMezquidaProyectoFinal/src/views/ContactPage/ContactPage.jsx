import React from 'react';
import './ContactPage.css';

//import img
import telIcon from '../../img/icons8-volumen-del-timbre-48.png'
import wappIcon from '../../img/icons8-whatsapp-48.png'
import mailIcon from '../../img/icons8-mail.png'


function ContactPage() {
  return (
    <section className="contactPageContainer">
      <h1>Contáctanos (pagina no funcional, solo para poner contenido)</h1>
      <section className="container">
        <div className="row mt-5">
          <div className="col-md-6">
            <h4>- Informacion de Contacto -</h4>
            <div className="gridContacto">
              <img className="info_contacto tel1" src={telIcon} alt="" />
              <a href="" className="info_contacto tel2"> +54 11 1111-1111</a>
              <a href="" className="info_contacto tel3"> +54 11 2222-2222</a>

              <img className="info_contacto wapp" src={wappIcon} alt="" />
              <a className="info_contacto wapp1" href="">+54 11 3333-3333</a>

              <img className="info_contacto email" src={mailIcon} alt="" />
              <a className="info_contacto email1" href="">varpadel@mailfalso.com</a>
            </div>
          </div>

          <div className="col-md-6">
            <h4>- Envianos tu Consulta -</h4>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label"> Correo electrónico</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="nombre@ejemplo.com" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Mensaje:</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" />
              </div>
              <input type="submit" value="Enviar" className="button btn btn-primary" />
            </form>
          </div>
        </div>
      </section>
      <section className="ubicacion">
        <h4>- Nuestra Dirección -</h4>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016713276846!2d-58.383759084404645!3d-34.60373888045948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4aa9f0a6da5edb%3A0x11bead4e234e558b!2sObelisco!5e0!3m2!1ses-419!2sar!4v1670473163350!5m2!1ses-419!2sar" style={{ border: "1px solid black" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <a href="https://goo.gl/maps/9fpucxEThnBVhkEw9" target="_blank" rel="noopener noreferrer">9 de Julio s/n, C1043 CABA</a>
      </section>
    </section>
  );
}

export default ContactPage