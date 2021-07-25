import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import Product from "../../componant/product/Product";
import './Shop.css'
import Cart from '../cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link, useHistory } from 'react-router-dom';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const history = useHistory()
    // use effect area 
    useEffect(() => {
        setProducts(fakeData.slice(0, 20));
    }, [])
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(prdKey => {
            const product = fakeData.find(pd => pd.key === prdKey)
            product.quantity = savedCart[prdKey];
            return product;
        })
        setCart([...previousCart])
    }, [])





    // functional area
    const addEventHandler = (product) => {
        let sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = sameProduct.quantity + 1;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = count;
            newCart = [...cart, product]
        }

        addToDatabaseCart(product.key, count)
        setCart(newCart)
        // console.log(newCart);

    }

    const handleAddToCart = id =>{
    
        
        const sameProduct = cart.find(pd => pd.id === id)
        let newCart ;
        if(sameProduct){
            const otherProducts = cart.filter(pd => pd.id !== id)
            sameProduct.quantity = sameProduct.quantity + 1;
            newCart = [...otherProducts,sameProduct]
        }
        else{
            const getProduct = allProduct.find(pd => pd._id === id)
            const newProduct ={
                id : getProduct._id,
                name : getProduct.name,
                quantity : 1,
                price : getProduct.price
            }
            newCart = [...cart,newProduct]
        }
        setCart(newCart)
        history.push('/checkout')
    }

    // return area
    return (
        <div className='twin-container'>
            <div className="item-container">
                {products.map(pd => <Product
                    key={pd.key}
                    showAddBtn={true}
                    product={pd}
                    addEventHandler={addEventHandler}
                ></Product>)}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className='mx-auto addCartBtn'>Order Review</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;