import './HomePage.css';
import { Link } from "react-router-dom"
import  {rebootStock}  from "../../firebase/firebaseConfig"

function HomePage() {
const btnRebootServer = () => (
fetch('../public/productos_bd.json')
    .then(response => response.json())
        .then(productosParseados=> {
            const productos =productosParseados
            
            rebootStock(productos)
        }))


  return (
    <div className="home-container">
      <h1>Bienvenido a VarShoes</h1>
      <p>Encuentra las mejores zapatillas para ti</p>
      <div className="center-link">
        <Link to="/catalog" className="btn-shop-now">Comprar ahora</Link>
        <button className='btn-reboot-server' onClick={btnRebootServer}>Reiniciar Servidor</button>
      </div>
    </div>
  );
}

export default HomePage;