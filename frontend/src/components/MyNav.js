import React from 'react'
import { Link } from "react-router-dom";
import { selectUsername, selectAdmin, selectLogged, logout } from '../features/counter/loginSlice.js'
import { useSelector, useDispatch } from 'react-redux';
const MyNav = () => {
    const admin = useSelector(selectAdmin);
    const logged = useSelector(selectLogged);
    const dispatch = useDispatch();
    return (
        <div>
            <Link type="button" className="btn btn-primary" to="/">Home</Link>{" "}
            <Link type="button" className="btn btn-primary" to="/register">register</Link>{" "}
            <Link type="button" className="btn btn-primary" to="/About">About</Link>{" "}
            {!logged ? <Link type="button" className="btn btn-primary" to="/Login">Login</Link> : <button type="button" className="btn btn-primary" onClick={() => dispatch(logout())}>Logout</button>}{" "}
            {admin && <div> Admin: <Link type="button" className="btn btn-dark" to="/Admin">Admin</Link>{" "}</div>}
            <Link type="button" className="btn btn-primary" to="/Shop">Shop</Link>{" "}
        </div>
    )
}

export default MyNav