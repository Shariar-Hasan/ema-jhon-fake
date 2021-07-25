import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';



const Product = (p) => {
    const {name , img, seller, price, stock, key} = p.product;
    const {showAddBtn} = p;
    return (
        <div className='product'>
            <div className="product-img">
                <img src={img} alt=""/>
            </div>
            <div className="product-description">
                <h5><Link to={"/product/"+key}>{name}</Link></h5>
                <p><small>by: {seller}</small></p>
                <p><small>${price}</small></p>
                <p><small>only {stock} left in stock - order soon</small></p>
                {showAddBtn && <button className='addCartBtn' onClick={() => p.addEventHandler(p.product)}><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>}
            </div>
        </div>
    );
};

export default Product;