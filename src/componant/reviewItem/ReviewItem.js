import React from 'react';
import '../product/Product.css'

const ReviewItem = (props) => {
    const {name, quantity,price,key} = props.product;
    const productItemStyle = {
        borderBottom: '1px solid lightgray',
        padding : '30px',
    }
    return (
        <div style={productItemStyle} className='productItem'>
            <h3>{name}</h3>
            <p>Price : ${price}</p>
            <p>Quantity : {quantity}</p>
            <button 
                onClick={() => props.removeItemFromCart(key)}
                className='addCartBtn'
            >Remove</button>
        </div>
    );
};

export default ReviewItem;