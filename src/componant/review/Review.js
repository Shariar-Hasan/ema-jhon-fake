import React, { useEffect, useState } from 'react';
import {  useHistory } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../cart/Cart';
import ReviewItem from '../reviewItem/ReviewItem';
import placeOrderImage from '../../images/gif.gif'
const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPLace, setOrderPlace] = useState(false);

    const removeItemFromCart = (prodKey) => {
        const newCart = cart.filter(pd => pd.key !== prodKey);
        setCart(newCart);
        removeFromDatabaseCart(prodKey);
    }

    const history = useHistory()
    const proceedCheckout = () => {
        history.push("/shipment");
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartProducts);
    }, [])

    let orderPlaceImg = <img src={placeOrderImage} alt="" />
    return (
        <div className="twin-container">
            <div className="item-container">
                {
                    cart.map(pd => <ReviewItem
                        key={pd.key}
                        product={pd}
                        removeItemFromCart={removeItemFromCart}
                    ></ReviewItem>)
                }
                {
                    orderPLace && orderPlaceImg
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={proceedCheckout} className='mx-auto addCartBtn'>Proceed Checkout</button>
                </Cart>
            </div>
        </div>

    );
};

export default Review;