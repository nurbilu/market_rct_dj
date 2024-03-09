import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectProds, getProdsAsync, addProdAsync, deleteProdAsync, updateProdAsync } from '../features/products/prodSlice'
import { Axios } from 'axios';
import { selectUsername, selectAdmin, selectLogged, logout } from '../features/counter/loginSlice.js'

const Admin = () => {
  // Admin can add, delete, update, get all the products
  // Admin can see all the orders
  // Admin can update the order status
  // only Admin can see order_details

  const dispatch = useDispatch();
  const Prods = useSelector(selectProds);
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(null)
  const [category, setcategory] = useState(1)
  const [refresh, setrefresh] = useState(true)
  const admin = useSelector(selectAdmin);


  useEffect(() => {
    dispatch(getProdsAsync())
  }, [refresh])

  // implement delete 
  const handleDel = async (id) => {
    console.log(id);
    await dispatch(deleteProdAsync(id));
    setrefresh(!refresh);
  }

  // implemnet update - put 
  const handleUpd = (id, nwDataObj) => {
    dispatch(updateProdAsync({ id, nwDataObj: { description, price, catID: category } }));
  };
  return (
    <div>
      <hr1>Admin:</hr1>
      <hr></hr>


      {admin ? <div>
        <br></br>
        <button onClick={() => dispatch(logout())}>Logout</button>
        <hr></hr>
        description: <input onChange={(e) => setDescription(e.target.value)} />
        price: <input onChange={(e) => setPrice(e.target.value)} />
        category:
        <select onChange={(e) => setcategory(e.target.value)}>
          <option value="1">Foods & Kitchen</option>
          <option value="2">Electronics</option>
          <option value="3">Fashion & Accessories</option>
        </select>
        {/* ? */}
        image: <input type='file' onChange={(e) => setImage(e.target.files)} />
        <button className='btn btn-primary' onClick={() => dispatch(addProdAsync({ description, price, catID: category}))}>add product to my server - admin</button>
        {/* ? */}
        <hr></hr>
        total of products in market: <div >{Prods.length}</div>

      </div> : <h2 style={{ color: "red", padding: 250 }}>Admin please login ! </h2>}
      <div className="row row-cols-1 row-cols-md-6 g-4">
        {admin ? Prods.map(prod => <div key={prod.id} className="col" >
          <div className="card">
            <img src={"https://picsum.photos/20" + prod.id} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title"> {prod.id} , {prod.image}</h5>
              <p className="card-text"> {prod.description}  , <br></br> Only {prod.price}$ ! <br></br>
                Category: {prod.category_desc || 'Unknown'}
              </p>
              <button className='btn btn-danger' onClick={() => handleDel(prod.id)}>Delete</button>
              <button className='btn btn-warning' onClick={() => handleUpd(prod.id, {
                name: description || prod.description,
                price: price || prod.price,
                catID: category || prod.category,
              })}>update</button>
            </div>
          </div>
        </div>) : null}
      </div>
    </div>
  )
}

export default Admin