import React, { useContext, useEffect, useState } from 'react';
import "./cartbuy.css"
import { CartContext } from '../../context/CartContext';
import { StockContext, } from '../../context/StockContext';
import { collection, addDoc, getDocs, query, where, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig'

function CartBuy() {
    const { cartItems, clearCart } = useContext(CartContext)
    const { stock: products } = useContext(StockContext);
    const [precioEnvio, setPrecioEnvio] = useState(0);
    const totalPrice = cartItems.reduce((acumulador, item) => {
        acumulador = item.cantidad * item.precio
        return acumulador
    }, 0)

    useEffect(() => {
        if (cartItems.length > 0)
            setPrecioEnvio(300)
        else
            setPrecioEnvio(0)
    }, [cartItems])

    const handleBtnBuy = () => {
        setModalOpen(true);
    };

    let sumaCantidades = 0
    if (cartItems.length > 0) {
        sumaCantidades = cartItems.reduce((acumulador, item) => {
            return acumulador + item.cantidad;
        }, 0)
    }



    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        ciudad: '',
        email: '',
        confirmarEmail: ''
    });
    const [formErrors, setFormErrors] = useState({
        emailMismatch: false,
        emptyFields: false,
        invalidEmail: false,
    });
    const [emailValid, setEmailValid] = useState(true);
    const [modalOpen, setModalOpen] = useState(false)
    const emailInputClasses = `input-email ${!emailValid ? "input-error" : ""}`;

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleInputBlur = (event) => {
        const { name, value } = event.target;

        if (name === "email") {
            const isValid = value.includes("@") || value == "";
            setEmailValid(isValid);
        }

        if (name === "confirmarEmail" && value !== formData.email) {
            setFormErrors({ ...formErrors, emailMismatch: true });
        } else {
            setFormErrors({ ...formErrors, emailMismatch: false });
        }
    };

    const handleBtnClose = () => {
        setModalOpen(false)
        setFormData({
            nombre: "",
            apellido: "",
            ciudad: "",
            email: "",
            confirmarEmail: "",
        });
    }

    const handleBtnFinishBuy = async (e) => {
        e.preventDefault();

        try {
            const currentDateTime = new Date();
            const purchaseDate = `${currentDateTime.getDate()}/${currentDateTime.getMonth() + 1}/${currentDateTime.getFullYear()} ${currentDateTime.getHours()}:${currentDateTime.getMinutes()}:${currentDateTime.getSeconds()}`;
            const docRef = await addDoc(collection(db, "purchasesCollection"), {
                nombre: formData.nombre.charAt(0).toUpperCase() + formData.nombre.slice(1),
                apellido: formData.apellido.charAt(0).toUpperCase() + formData.apellido.slice(1),
                ciudad: formData.ciudad.charAt(0).toUpperCase() + formData.ciudad.slice(1),
                email: formData.email,
                cartItems: cartItems,
                purchaseDate: purchaseDate,
            });
            updateDb(cartItems)
            clearCart()
            alert("Se concretó la compra con el ID: " + docRef.id);
            setFormData({
                nombre: "",
                apellido: "",
                ciudad: "",
                email: "",
                confirmarEmail: "",
            });
            setFormErrors({
                emailMismatch: false,
                emptyFields: false,
            });
            setModalOpen(false);
        } catch (error) {
            console.error("Error al guardar los datos:", error);
        }
    };

    const isFormValid = () => {
        return (
            formData.nombre.trim() !== '' &&
            formData.apellido.trim() !== '' &&
            formData.ciudad.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.confirmarEmail.trim() !== '' &&
            formData.email === formData.confirmarEmail
        );
    };

    const updateDb = async (cartItems) => {
        for (const cartItem of cartItems) {
            const q = query(collection(db, 'shoes'), where('id', '==', cartItem.id));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                for (const doc of querySnapshot.docs) {
                    const productData = doc.data();
                    const productStockSize = productData.stock.find((item) => item.talle === cartItem.talle);
                    if (productStockSize) {
                        productStockSize.cantidad = productStockSize.cantidad - cartItem.cantidad;
                        await updateDoc(doc.ref, productData);
                    }
                }
            }
        }
    };
    return (
        cartItems.length > 0 ? (
            <div className="card card-cartBuy">
                <div className='cartBuyTitle'>
                    <h2>Resumen de compra</h2>
                </div>
                <div className='buyDetailContainer'>
                    <div className='detail1Container'>
                        <h4>Productos ({sumaCantidades})</h4>
                        <h4>$ {totalPrice}</h4>
                    </div>
                    <div className='detail2Container'>
                        <h4>Envío</h4>
                        <h4>$ {precioEnvio}</h4>
                    </div>
                    <div className='detail3Container'>
                        <h3>Total</h3>
                        <h3>$ {totalPrice + precioEnvio}</h3>
                    </div>
                    <button onClick={handleBtnBuy} className="btn btn-primary btnBuy">Añadir</button>
                </div>

                {/* MODAL DEL FORMULARIO */}
                {modalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <button className="close-btn" onClick={handleBtnClose}>
                                x
                            </button>
                            <h3>Finalizar compra: </h3>
                            <form>
                                <div className="form-group">
                                    <label>Nombre: </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Apellido: </label>
                                    <input
                                        type="text"
                                        name="apellido"
                                        value={formData.apellido}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Ciudad: </label>
                                    <input
                                        type="text"
                                        name="ciudad"
                                        value={formData.ciudad}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={"form-group " + emailInputClasses}>
                                    <label>Email: </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirmar Email: </label>
                                    <input
                                        type="email"
                                        name="confirmarEmail"
                                        value={formData.confirmarEmail}
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur}
                                    />
                                    {!emailValid && <p className="error">El correo es invalido</p>}
                                    {formErrors.emailMismatch && <p className="error">Los correos no coinciden</p>}
                                </div>
                            </form>
                            <button
                                onClick={handleBtnFinishBuy}
                                className="btn btn-primary btnFinishBuy"
                                disabled={!isFormValid()}
                            >
                                Finalizar compra
                            </button>
                        </div>
                    </div>
                )}
            </div>
        ) : (
            <div className="card card-cartBuy-disable">
                <div className='cartBuyTitle'>
                    <h2>Resumen de compra</h2>
                </div>
                <div className='buyDetailContainer'>
                    <h4> Aqui se veran los importes cuando sumes productos al carrito</h4>
                </div>
            </div>
        )
    );
}

export default CartBuy