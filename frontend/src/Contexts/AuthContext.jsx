import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {    
    const [userme, setData] = useState(null);
    const [error, setError] = useState(null);


    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        try {
            const response = await axios.post('http://localhost:8000/auth/refresh/', {
                refresh: refreshToken,
            });
            const { access } = response.data;
            localStorage.setItem('accessToken', access);
        } catch (error) {
            console.error('Error refreshing token:', error);
            // Handle error (e.g., log out the user if refresh fails)
        }
    };

    const fetchData = async (retry = true) => {
		const token = localStorage.getItem('accessToken');
		try {
			const response = await axios.get('http://localhost:8000/auth/user/', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
            // console.log(data);
			setData(response.data);
		} catch (error) {
			console.error('Error fetching data:', error);
			if (error.response && error.response.status === 401 && retry) {
				try {
					await refreshAccessToken(); // Attempt to refresh token
					fetchData(false); // Retry fetching data once, passing retry as false
				} catch (refreshError) {
					console.error('Error refreshing token:', refreshError);
					setError('Session expired. Please log in again.');
				}
			} else {
				setError('Failed to fetch data');
			}
		}
	};
    useEffect(() => {
		fetchData();
		
    }, []);

    return (
        <AuthContext.Provider value={{userme}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
