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
  }, [])

  const handleBuy = (id) => {
    console.log(id);
  }
  const handleRemove = (id) => {
    console.log(id);
  }  
  return (
    <div>Shop: 
    {logged ? <button onClick={() => dispatch(logout())}>Logout</button> : null}
      <hr></hr>
      total of products in market to choose from : {Prods.length}
            <div className="row row-cols-1 row-cols-md-6 g-4">
                {Prods.map(prod => <div className="col" key={prod.id}>
                    <div className="card">
                        <img src={"https://picsum.photos/20" +prod.id } className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{prod.id} , {prod.image},</h5>
                            <p className="card-text"> {prod.description}  , Only {prod.price}</p>
                            <button className='btn btn-success' onClick={() => handleBuy(prod.id)}>Buy</button>
                            <button className='btn btn-danger'onClick={() => handleRemove(prod.id)} >Remove</button>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

