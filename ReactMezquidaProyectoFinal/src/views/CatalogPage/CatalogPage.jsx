import React, { useEffect, useState, useContext } from 'react';
import "./catalogpage.css"
import { StockContext, } from '../../context/StockContext';
import ItemListContainer from '../../components/ItemListContainer/ItemListContainer';
import { Slider, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

function CatalogPage() {
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(100000);
  const [inputMin, setInputMin] = useState(precioMin);
  const [inputMax, setInputMax] = useState(precioMax);
  const [talles, setTalles] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [allSizes, setAllSizes] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [firstCount, setFirstCount] = useState(false)
  const { stock: products, setFiltObj } = useContext(StockContext);

  useEffect(() => {
    setFiltObj({
      precioMax: precioMax,
      precioMin: precioMin,
      marca: marcas,
      talle: talles,
    });
  }, [setFiltObj, precioMin, precioMax, talles, marcas]);

  const handleTalleChange = (talle, isChecked) => {
    if (isChecked) {
      setTalles((prevTalles) => [...prevTalles, talle]);
    } else {
      setTalles((prevTalles) => prevTalles.filter((t) => t !== talle));
    }
  };

  const handleMarcaChange = (marca, isChecked) => {
    if (isChecked) {
      setMarcas((prevMarcas) => [...prevMarcas, marca]);
    } else {
      setMarcas((prevMarcas) => prevMarcas.filter((m) => m !== marca));
    }
  };
  useEffect(() => {
    console.log(products);
}, [products])
  useEffect(() => {
    if (products && !firstCount) {
      const dataBrands = [];
      products.forEach((product) => {
        const marca = product.marca;
        if (!dataBrands.includes(marca)) {
          dataBrands.push(marca);
        }
      });
      dataBrands.sort()
      setAllBrands(dataBrands)
      const dataSizes = [];
      products.forEach((product) => {
        product.stock.forEach((stock) => {
          if (!dataSizes.includes(stock.talle)) {
            dataSizes.push(stock.talle);
          }
        })
      });
      dataSizes.sort((a, b) => a - b)
      setAllSizes(dataSizes)
      setFirstCount(true)
    }
  }, [products, firstCount])
  return (
    <div className='catalogpage-container'>
      <div className='filter-menu'>
        <h2>Opciones de Filtro:</h2>
        <div className='price-container'>
          <h3>Precio: </h3>
          <Slider
            value={[precioMin, precioMax]}
            onChange={(event, value) => {
              setPrecioMin(value[0]);
              setPrecioMax(value[1]);
              setInputMin(value[0]);
              setInputMax(value[1]);
            }}
            min={0}
            max={100000}
            valueLabelDisplay='auto'
          />
          <div className='inputs-sliders-container'>
            <div className='input-min'>
              <label>Desde:</label>
              <input
                type="number"
                value={inputMin}
                onChange={(event) => {
                  const newValue = parseInt(event.target.value);
                  setInputMin(newValue);
                  setPrecioMin(newValue);
                }}
              />
            </div>
            <div className='input-max'>
              <label>Hasta:</label>
              <input
                type="number"
                value={inputMax}
                onChange={(event) => {
                  const newValue = parseInt(event.target.value);
                  setInputMax(newValue);
                  setPrecioMax(newValue);
                }}
              />
            </div>
          </div>
        </div>
        <FormGroup>
          <h3> Marcas: </h3>
          <div className='brands-container'>
            {allBrands &&
              allBrands.map((brand) => (
                <div key={brand}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={marcas.includes(brand)}
                        onChange={(event) =>
                          handleMarcaChange(brand, event.target.checked)
                        }
                      />
                    }
                    label={brand}
                  />
                </div>
              ))}
          </div>
        </FormGroup>
        <FormGroup>
          <h3> Talles: </h3>
          <div className='sizes-container'>
            {allSizes &&
              allSizes.map((size) => (
                <div key={"talle " + size}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={talles.includes(size)}
                        onChange={(event) =>
                          handleTalleChange(size, event.target.checked)
                        }
                      />
                    }
                    label={'Talle ' + size}
                  />
                </div>
              ))}
          </div>
        </FormGroup>
      </div>
      <div className='itemlist-container'>
        <ItemListContainer />
      </div>
    </div>
  );
}

export default CatalogPage

