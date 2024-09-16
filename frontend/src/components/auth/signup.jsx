import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faMailBulk, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { ColorContext } from "../../Contexts/ThemeContext";
import axios from 'axios';

export function Input({ icon, label, placeholder, type, value, onChange }) {
    return (
        <div className="input-container ">
            <label className="text-[10px] flex justify-between px-2 mt-4 " htmlFor={label}>
                {label}: <FontAwesomeIcon icon={icon} />
            </label>
            <input
                className="mt-1  w-full text-lightText outline-none text-[10px] px-2 rounded h-8 border-gray-300 border-[.5px]"
                type={type}
                id={label}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default function Signup() {
    const color = useContext(ColorContext).substring(6, 13);
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/auth/signup/', { username, email, password });
            navigate('/auth/login');
        } catch (error) {
            setError('Error signing up');
        }
    };

    return (
        <div className="signup-container">
            <div className="heading w-full p-1 text-center">
                <h1 className="text-[40px] font-semibold capitalize">Hello</h1>
                <p className="text-[8px]">Lorem ipsum dolor sit amet elit.</p>
            </div>
            <div className="w-1/2 max-w-[500px] mx-auto mt-6">
                <form onSubmit={handleSignup} className="login-form grid mt-6 w-full">
                    <Input
                        icon={faUser}
                        label="Username"
                        placeholder="john doe"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        icon={faMailBulk}
                        label="Email"
                        placeholder="example@gmail.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        icon={faKey}
                        label="Password"
                        placeholder="***********"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="text-red-500">{error}</p>}

                    <button
                        type="submit"
                        style={{ background: color }}
                        className="mt-4 text-white rounded text-[10px] h-8 flex w-full justify-center items-center"
                    >
                        Create Account
                    </button>
                </form>
                <p className="text-[10px] mt-4">
                    Already have an account? <Link to="../login" className="text-blue-500">Login</Link>
                </p>
            </div>
        </div>
    );
}
