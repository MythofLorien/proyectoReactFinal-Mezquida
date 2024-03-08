import React, { useContext } from 'react';
import { useParams } from 'react-router-dom'
import { StockContext,} from '../../context/StockContext';

import ItemDetail from '../../components/ItemDetail/ItemDetail';

const DetailPage = () => {
  const {stock: products} = useContext(StockContext);
  let {id} = useParams()
  return (
    products &&
      <ItemDetail data= {products.find(product => product.id == id.toString())}/>
  )
}

export default DetailPage