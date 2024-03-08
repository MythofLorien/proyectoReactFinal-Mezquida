import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import { StockContext } from '../context/StockContext';
// Views
import Home from '../views/HomePage/HomePage';
import About from '../views/AboutPage/AboutPage';
import Contact from '../views/ContactPage/ContactPage';
import ErrorPage from '../views/ErrorPage/ErrorPage';
import DetailPage from '../views/DetailPage/DetailPage';
import CatalogPage from '../views/CatalogPage/CatalogPage';
import CartPage from '../views/CartPage/CartPage';
import BrandPage from '../views/BrandPage/BrandPage';



function AppRouter() {
    function CustomRoute({ element: Element, redirectTo }) {
        const { id } = useParams();
        const { stock: products } = useContext(StockContext);
        if (products) {
            const isValidId = products.some(product => product.id == id)

            // Redirige a la página de error si el ID no es válido
            if (!isValidId) {
                return <Navigate to={redirectTo} />;
            }

            // Renderiza el componente proporcionado
            return <Element />;
        }
    }
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/catalog' element={<CatalogPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route
                path='/catalog/detail/:id'
                element={
                    <CustomRoute redirectTo='/error' element={DetailPage} />
                }
            />
            <Route path="/brand/:brandValue" element={<BrandPage />} />
            <Route path='/error' element={<ErrorPage />} />
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    );
}

export default AppRouter