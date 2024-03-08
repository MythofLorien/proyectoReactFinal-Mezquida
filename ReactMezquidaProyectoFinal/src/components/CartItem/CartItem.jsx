import { useContext } from 'react';
import { Link } from "react-router-dom"
import "./cartitem.css"
import { StockContext } from '../../context/StockContext';
import { CartContext } from '../../context/CartContext';
import emptyCart from "../../img/carritovacio.png"

function CartItem({ data }) {
    const {stock:products} = useContext(StockContext);
    const { cartItems, setCartItems, removeFromCart, clearCart } = useContext(CartContext)
    let maxQuantity = "-"
    let subtotal
    if (data != null){
    subtotal = data.precio * data.cantidad;
    if (products) {
        maxQuantity = products.find(item => item.id === data.id).stock.find(stock => stock.talle == data.talle).cantidad
    }
}
    const handleBtnPlus = () => {
        const updatedItems = cartItems.map((item) => {
            if (item.id == data.id && item.cantidad < maxQuantity) {
                return {
                    ...item,
                    cantidad: item.cantidad + 1,
                };
            }
            return item;
        });
        setCartItems(updatedItems);
    };

    const handleBtnMinus = () => {
        const updatedItems = cartItems.map((item) => {
            if (item.id == data.id && data.cantidad > 1) {
                return {
                    ...item,
                    cantidad: item.cantidad - 1,
                };
            }
            return item;
        });
        setCartItems(updatedItems);
    };

    const handleBtnEraseItem = () => {
        removeFromCart(data.id)
    }

    return (
        data != null ?(
        <div className="card card-cart">
            <div className="product-info">
                <div className='ordenPrimero'>
                    <Link to={`/catalog/detail/${data.id}`}>
                        <img src={data.img} className="product-image" alt="Product" />
                    </Link>
                </div>
                <div className='ordenSegundo'>
                    <Link to={`/catalog/detail/${data.id}`}>
                        <div className='product-name-container'>
                        <h2 className="product-name">{data.nombre}</h2>
                        <span>(talle:{data.talle})</span>
                        </div>
                    </Link>
                    <button onClick={handleBtnEraseItem} className="btn-erase">Eliminar</button>
                </div>
                <div className='ordenTercero'>
                    <div className="quantity-container">
                        <div>
                            <h4>Cantidad: </h4>
                        </div>
                        <div className='quantity-actual'>
                            <button onClick={handleBtnMinus} className="quantity-btn btn-minus">-</button>
                            <input type="number" className="quantity-input" value={data.cantidad} readOnly />
                            <button onClick={handleBtnPlus} className="quantity-btn btn-plus">+</button>
                        </div>
                        <div className='quantity-maximun'>
                            <span>({maxQuantity} disponibles)</span>
                        </div>
                    </div>
                </div>
                <div className='ordenCuarto'>
                    <div className="price-container">
                        <div className="unit-price">
                            <strong>Precio:</strong> ${data.precio}
                        </div>
                        <div className="subtotal">
                            <strong>Subtotal:</strong> ${subtotal}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ) : (
            <div className="card card-cart">
                <div className="empty-cart">
                    <img src={emptyCart} alt="" />
                    <h3> Empieza tu compra</h3>
                    <h4> Suma productos a tu carrito!</h4>
                    <div>
                        <Link to="/catalog" className="btn btn-primary">Comprar ahora</Link>
                    </div>
                </div>
            </div>
        )
    );
}

export default CartItem;