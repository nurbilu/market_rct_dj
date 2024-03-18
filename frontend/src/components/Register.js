import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../features/register/registerSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await dispatch(registerAsync({ username, email, password, confirmPassword })).unwrap();
            if (response.status === 201 || 200) {
                toast.success('Registration successful!');
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            }
        } catch (err) {
            toast.error('Registration failed!');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    };

    useEffect(() => {}, []);

    return (
        <form onSubmit={handleSubmit}>
            <ToastContainer />
            <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
                <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password">
                <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </FloatingLabel>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button type="submit" variant="contained" endIcon={<SendIcon />} color='success'>Register</Button>
        </form>
    );
};

export default Register;
