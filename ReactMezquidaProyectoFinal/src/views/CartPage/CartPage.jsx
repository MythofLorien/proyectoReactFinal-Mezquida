import './cartpage.css'
import CartBuy from "../../components/CartBuy/CartBuy"
import CartItemContainer from "../../components/CartItemContainer/CartItemContainer"

function CartPage() {
    return (
        <div className="cartPageContainer">
            <div className="cartItemContainer">
                <CartItemContainer />
            </div>
            <div className="cartBuyContainer">
                <CartBuy />
            </div>
        </div>
    )
}

export default CartPage