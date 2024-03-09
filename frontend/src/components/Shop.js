import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectProds, getProdsAsync, addProdAsync } from '../features/products/prodSlice'
import { selectUsername, selectAdmin, selectLogged, logout } from '../features/counter/loginSlice.js'

export const Shop = () => {
  // users and admin can see all the products 
  // users can add the products to the cart 
  // users can see the cart
  // users can update the cart
  // users can delete the cart and items from the cart
  // users can see the order
  // users can checkout the order
  // users can see the order_details of the user order only 
  const dispatch = useDispatch();
  const Prods = useSelector(selectProds);
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(null)
  const [cart, setcart] = useState("")
  const logged = useSelector(selectLogged);
  useEffect(() => {
    dispatch(getProdsAsync())
    updateCartFromLocalStorage();
  }, []);

  const updateCartFromLocalStorage = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setcart(storedCart);
  };

  const handleBuy = (id) => {
    let updatedCart = [];
    const existingItemIndex = cart.findIndex(item => item.product.id === id);
    if (existingItemIndex !== -1) {
      updatedCart = cart.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, count: item.count + 1 };
        } else {
          return item;
        }
      });
    } else {
      const item = Prods.find(prod => prod.id === id);
      updatedCart = [...cart, { product: item, count: 1 }];
    }
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartFromLocalStorage();
  };


  const handleRemove = (id) => {
    const updatedCart = cart.reduce((acc, item) => {
      if (item.product.id === id) {
        if (item.count > 1) {
          acc.push({ ...item, count: item.count - 1 });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartFromLocalStorage();
  };


  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setcart([]);
  };

  return (
    <div>Shop:
      {logged ? <button onClick={() => dispatch(logout())}>Logout</button> : null}
      <hr></hr>
      total of products in market to choose from : {Prods.length}
      <div className="row row-cols-1 row-cols-md-6 g-4">
        {Prods.map(prod => <div className="col" key={prod.id}>
          <div className="card">
            <img src={"https://picsum.photos/20" + prod.id} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{prod.id} , {prod.image},</h5>
              <p className="card-text"> {prod.description}  , Only {prod.price}$ </p>
              <button className='btn btn-success' onClick={() => handleBuy(prod.id)}>Buy</button>
              <button className='btn btn-danger' onClick={() => handleRemove(prod.id)} >Remove</button>
            </div>
          </div>
        </div>)}
        <div>

        </div>
      </div>

      <h2>Cart</h2>
      <button className='btn btn-warning' onClick={handleClearCart}>Clear Cart</button>
      {cart.length > 0 ? (
        cart.map(item => (
          <div key={item.product.id}>
            {item.product.description} - ${item.product.price} x {item.count}
            <button onClick={() => handleRemove(item.product.id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
      <button className='btn btn-success' onClick={() => alert('checkout')}>Checkout</button>
    </div>
  );
};

