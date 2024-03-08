import { useState, useEffect, createContext } from "react"
export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [loadedFromLocalStorage, setLoadedFromLocalStorage] = useState(false);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems && !loadedFromLocalStorage) {
            setCartItems(JSON.parse(storedCartItems));
            setLoadedFromLocalStorage(true);
        }
    }, [loadedFromLocalStorage]);

    useEffect(() => {
        if (loadedFromLocalStorage) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems, loadedFromLocalStorage]);

    const addToCart = (product) => {
        setCartItems([...cartItems, product])
    }

    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter((item) => item.id !== productId));
    }

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems')
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            clearCart,
        }}> {children}
        </CartContext.Provider>
    )
}