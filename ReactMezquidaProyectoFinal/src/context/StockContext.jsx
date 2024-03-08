import { getStock } from "../firebase/firebaseConfig";
import { useState, useEffect, createContext } from "react";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [stock, setStock] = useState(null);
    const [filtObj, setFiltObj] = useState({
        precioMin: null,
        precioMax: null,
        marca: null,
        talle: null,
    });

    useEffect(() => {
        const { precioMin, precioMax, marca, talle } = filtObj;

        const filteredFiltObj = {
            precioMin: precioMin !== null ? precioMin : undefined,
            precioMax: precioMax !== null ? precioMax : undefined,
            marca: marca !== null ? marca : undefined,
            talle: talle !== null ? talle : undefined,
        };
        getStock(filteredFiltObj)
            .then((products) => {
                setStock(products);
            })
            .catch((error) => {
                console.error("Error al obtener el stock:", error);
            });
    }, [filtObj]);

    return (
        <StockContext.Provider value={{ stock, setFiltObj,filtObj }}>
            {children}
        </StockContext.Provider>
    );
};
