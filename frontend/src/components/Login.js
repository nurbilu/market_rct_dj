import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {  loginAsync, selectUsername, selectLogged,logout } from '../features/counter/loginSlice.js'

const Login = () => {
    const [username, setuserName] = useState("")
    const [password, setpassword] = useState("")
    const [msg, setmsg] = useState("")
    const userName = useSelector(selectUsername);
    const logged = useSelector(selectLogged);
    const dispatch = useDispatch();
    return (
        <div>
            Login<br></br>
            {!logged && <div style={{ color: "red" }}><h1>{msg}</h1></div>}
            {logged && <div style={{ color: "green" }}><h1>{userName}</h1></div>}
           
            {!logged ? <div>
                User name<input onChange={(e) => setuserName(e.target.value)} />
                password:<input type='password' onChange={(e) => setpassword(e.target.value)} />
                <button onClick={() => dispatch(loginAsync({ username, password }))}>Login</button><br></br>
            </div>
            :
            <button onClick={() => dispatch(logout())}>Logout</button>}
        </div>
    )
}

export default Login