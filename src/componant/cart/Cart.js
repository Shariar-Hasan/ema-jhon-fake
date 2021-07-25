import React from 'react';
import { } from 'react-router-dom';
import './Cart.css';
import '../product/Product.css'

const Cart = (p) => {
    const cart = p.cart;
    let total = cart.reduce((total, prd) => total + (prd.price * prd.quantity), 0);
    let shippingCost = (cart.length > 35 || cart.length === 0) ? 0 : (cart.length > 15) ? 4.99 : 12.99;
    let tax = Number((total / 10).toFixed(2));
    let grandTotal = (total + shippingCost + tax);

    return (
        <div className='cart'>
            <h5>Order Summery</h5>
            <h5>Item Ordered : {cart.length}</h5>
            <p><small>Item Price: {total.toFixed(2)}</small></p>
            <p><small>Shipping & Handling: {shippingCost}</small></p>
            <p><small>Tax: {tax}</small></p>
            <hr />
            <p><small>Total: {grandTotal.toFixed(2)}</small></p>
            {
                p.children
            }
        </div>
    );
};

export default Cart;