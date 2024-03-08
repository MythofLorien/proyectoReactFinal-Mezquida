import './App.css'
import { StockProvider } from "./context/StockContext"
import { CartProvider } from './context/CartContext'
import { BrowserRouter as Router } from "react-router-dom"


//Components
import NavBar from './components/NavBar/NavBar'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/Footer/Footer'


function App() {
  return (
    <StockProvider>
      <CartProvider>
        <Router basename="/React-ProyectoFinal">
          <div className='body'>
            <NavBar />
            <AppRoutes />
          </div>
        </Router>
      </CartProvider>
      <Footer />
    </StockProvider>
  )
}

export default App
