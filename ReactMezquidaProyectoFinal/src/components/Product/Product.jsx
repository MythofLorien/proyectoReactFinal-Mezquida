import "./product.css"

function Product({ data }) {
    console.log(data)
    const opciones1 = ['Opción 1', 'Opción 2', 'Opción 3']; // Ejemplo de opciones1
    return (
        <div className="card cardHover" style={{ width: '20rem' }}>
            <img src={data.sprites.back_default} className="card-img-top" alt="..." />
            <div className="card-body">
                <h4 className="card-title">
                    <strong>{data.name}</strong>
                </h4>
                <p className="card-text ml8px">
                    <strong>Tipo:</strong> {data.types[0].type.name} <br /> <strong>Precio:</strong>
                </p>
            </div>
        </div>
    );
}

export default Product