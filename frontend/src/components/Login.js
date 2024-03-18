import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginAsync, selectUsername, selectLogged, logout } from '../features/login/loginSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const userName = useSelector(selectUsername);
    const logged = useSelector(selectLogged);
    const dispatch = useDispatch();

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <div>
                        Login<br></br>
                        {!logged && <div style={{ color: "red" }}><h1>{msg}</h1></div>}
                        <br></br>
                        {logged && <div style={{ color: "green" }}><h1>{userName} is IN !</h1></div>}
                        <br></br>
                        {!logged ? <div>
                            <Form>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label>User name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUserName(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                                <br></br>
                                <Button variant="success" onClick={() => dispatch(loginAsync({ username, password }))}>Login</Button>
                            </Form>
                            <br></br>
                        </div>
                            :
                            <Button variant="danger" onClick={() => dispatch(logout())}>Logout</Button>}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
