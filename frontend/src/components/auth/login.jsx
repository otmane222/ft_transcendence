import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faAirbnb } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk, faKey } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ColorContext } from "../../Contexts/ThemeContext";
import axios from 'axios';

export function OauthItems() {
    const color = useContext(ColorContext).substring(6,13);
    return (
        <>
            <div className="login-google cursor-pointer text-[8px] uppercase h-8 border-blue-500/80 border-[1px] w-full rounded flex items-center justify-center">
                <h5 className="mr-2">continue with google account</h5>
                <i><FontAwesomeIcon icon={faGoogle} /></i>
            </div>
            <div className="login-42 cursor-pointer text-[8px] uppercase h-8 mt-4 border-red-500/80 border-[1px] rounded w-full flex items-center justify-center">
                <h5 className="mr-2">continue with 42 account</h5>
                <i><FontAwesomeIcon icon={faAirbnb} /></i>
            </div>
        </>
    );
}

export function Input({ icon, label, placeholder, type, value, onChange }) {
    return (
        <>
            <label className="text-[10px] flex justify-between px-2 mt-4" htmlFor={label}>{label} : <FontAwesomeIcon icon={icon} /></label>
            <input
                className="mt-1 text-lightText outline-none text-[10px] px-2 rounded h-8 border-gray-300 border-[.5px]"
                type={type}
                id={label}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    );
}

export default function Login() {
    const color = useContext(ColorContext).substring(6,13);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // const handleLogin = (credentials) => {
    //     axios.post('http://localhost:8000/auth/login/', credentials)
    //         .then(response => {
    //             localStorage.setItem('jwt', response.data.token); // Store the token
    //             // Optionally fetch user data here or let the context handle it
    //         })
    //         .catch(error => {
    //             console.error('Login error:', error);
    //         });
    // };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/auth/login/', {
                username,
                password
            });
            const { access, refresh } = response.data; // Get both tokens
    
            // Save tokens to localStorage
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
    
            // Redirect to the dashboard
            window.location.href = '/dashboard';
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    

    return (
        <>
            <div className="heading w-full p-1 text-center">
                <h1 className="text-[40px] font-semibold capitalize">welcome back</h1>
                <p className="text-[8px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, cumque.</p>
            </div>
            <div className="w-1/2 max-w-[500px] mx-auto mt-6">
                <OauthItems />
                <form onSubmit={handleLogin} className="login-form grid mt-6 w-full">
                    <Input
                        icon={faMailBulk}
                        label="username"
                        placeholder="Enter username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        icon={faKey}
                        label="password"
                        placeholder="Enter password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-[10px]">{error}</p>}
                    <a className="text-[10px] mt-4" href="#">Forget password?</a>
                    <button
                        type="submit"
                        style={{ background: color }}
                        className="mt-4 text-white rounded text-[10px] h-8 flex w-full justify-center items-center"
                    >
                        LOGIN
                    </button>
                    <p className="text-[10px] mt-4">You don't have an account? <Link to="../signup" className="text-blue-500">Sign up</Link></p>
                </form>
            </div>
        </>
    );
}
