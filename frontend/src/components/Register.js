import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../features/counter/registerSlice'; // Corrected import
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            // setError('Failed to register');
            toast.error('Registration failed!');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    };
    useEffect(() => {

    }, [])

    return (

        <form onSubmit={handleSubmit}>
            {/* Form fields for username, email, password, and confirmPassword */}
            <ToastContainer />
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
