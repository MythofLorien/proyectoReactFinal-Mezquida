import "./navbar.css"
import CartWidget from '../CartWidget/CartWidget';
import { Link } from "react-router-dom"



function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link to="/" className="nav-item">
                    <span className="navbar-brand">VarShoes</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link to="/" className="nav-item">
                            <span className="nav-link" aria-current="page" >Inicio</span>
                        </Link>
                        <Link to="/catalog" className="nav-item">
                            <span className="nav-link" aria-current="page" >Catalogo</span>
                        </Link>
                        <li className="nav-item dropdown ">
                            <span className="nav-link  dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Marcas
                            </span>
                            <ul className="dropdown-menu bg-primary ">
                                <Link to="/brand/adidas" className="dropdown-item ">
                                    <span>Adidas</span>
                                </Link>
                                <Link to="/brand/asics" className="dropdown-item">
                                    <span>Asics</span>
                                </Link>
                                <Link to="/brand/diadora" className="dropdown-item">
                                    <span>Diadora</span>
                                </Link>
                                <Link to="/brand/nike" className="dropdown-item">
                                    <span>Nike</span>
                                </Link>
                                <Link to="/brand/reebok" className="dropdown-item">
                                    <span>Reebok</span>
                                </Link>
                                <Link to="/brand/puma" className="dropdown-item">
                                    <span>Puma</span>
                                </Link>

                            </ul>
                        </li>
                        <Link to="/about" className="nav-item">
                            <span className="nav-link" >Nosotros</span>
                        </Link>
                        <Link to="/contact" className="nav-item">
                            <span className="nav-link" >Contacto</span>
                        </Link>
                    </ul>
                    <Link to="/cart" className="nav-item">
                        <CartWidget />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavBar