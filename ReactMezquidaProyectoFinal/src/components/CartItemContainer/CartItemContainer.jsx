import "./cartitemcontainer.css"
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext'
import CartItem from '../../components/CartItem/CartItem'



function CartItemContainer() {
    const { cartItems, clearCart } = useContext(CartContext)
    const handleBtnCartClear = () => {
        clearCart()
    }
    return (
        cartItems.length>0? (
        <div className='CartItemContainer'>
            {cartItems.map((cartItem) => (
                <div key={`${cartItem.id}-${cartItem.talle}`}>
                    <CartItem data={cartItem} />
                </div>
            ))}
            {cartItems.length > 0 && (
                <button onClick={handleBtnCartClear} className="btn-clear">
                    Vaciar Carrito
                </button>
            )}
        </div>)
        : (
            <div className='CartItemContainer'>
                <CartItem data={null} />
            </div>
        )
    )
}

export default CartItemContainer