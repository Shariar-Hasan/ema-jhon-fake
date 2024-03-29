import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    console.log(product);
    return (
        <div>
            <Product showAddBtn={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;