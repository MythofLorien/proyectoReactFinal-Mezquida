import "./item.css"
import React from 'react';
import {Link} from "react-router-dom"


function Item({ data }) {
    return (
        <div className="card cardHover" style={{ width: '20rem' , height: '18rem'}}>
            <Link to={`/catalog/detail/${data.id}`}>
                <div>
                    <img src={data.img} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h2 className="card-title">
                            {data.nombre.charAt(0).toUpperCase() + data.nombre.slice(1)}
                        </h2>
                        <h3>
                            <strong>Price: ${data.precio} </strong>
                        </h3>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Item