import './brandpage.css'
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom"
import { StockContext, } from '../../context/StockContext';
import Item from '../../components/Item/Item';

function BrandPage() {
    const { stock: products, setFiltObj, filtObj } = useContext(StockContext);
    const { brandValue } = useParams()
    const [brand,setBrand] = useState(brandValue.charAt(0).toUpperCase() + brandValue.slice(1))

    useEffect(()=>{
        setBrand(brandValue.charAt(0).toUpperCase() + brandValue.slice(1));
    },[brandValue])

    useEffect(() => {
        console.log(brand);
        setFiltObj({
            precioMax: 100000,
            precioMin: 0,
            marca: [brand],
            talle: undefined,
        });
        return () => {
            setFiltObj({
                precioMin: null,
                precioMax: null,
                marca: null,
                talle: null,
            });
        };
    }, [brand, setFiltObj]);
    
    useEffect(() => {
        console.log(products);
    }, [products])
    useEffect(()=>{
        console.log(filtObj);
    },[filtObj])

    return (
        <div className="contenedor d-flex justify-content-evenly flex-wrap  gap-3">
            {
                products &&
                products.map((product) => (
                    <div key={product.id}>
                        <Item data={product} />
                    </div>
                ))}
        </div>

    )
}

export default BrandPage