import React from 'react'
import { Link } from "react-router-dom"
import './errorpage.css'

function ErrorPage() {
  return (
    <div className='error-page-container'>
      <h3>404</h3>
      <h2>Page Not Found</h2>
      <Link to="/catalog" className="btn-catalog">Volver al Catalogo</Link>
    </div>
  )
}

export default ErrorPage