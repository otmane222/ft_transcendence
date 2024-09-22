import { faSearch, faCaretDown, faUser, faGear, faRightToBracket, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { ColorContext, ThemeContext } from "../Contexts/ThemeContext";
import { Link } from "react-router-dom";

import  { useEffect } from "react";
import axios from "axios";

export default function Search() {
    const theme = useContext(ThemeContext)
    const [show, setShow] = useState(false)
    const color = useContext(ColorContext).substring(6,13);

    const [data, setData] = useState(null);
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
	// if (data){
	// 	console.log(data)
	// }

    return (
        <>
            <div className="flex relative w-full h-[5vh] max-h-[60px]">
                <div 
                    className={`
                    ${theme === 'light' ? "bg-lightItems text-lightText" : "bg-darkItems text-darkText"}
                    search
                    flex-grow
                    h-full 
                    rounded-sm 
                    p-1 
                    px-3 
                    flex 
                    items-center
                    shadow-sm
                    `}>
                    
                    <FontAwesomeIcon icon={faSearch} className="text-[10px] mr-1"  />
                    <input type="text" placeholder="search..." className="w-full h-full border-none bg-transparent text-[10px] ml-1 focus:outline-none" />
                </div>
                <div className={`
                    ${theme === 'light' ? "bg-lightItems text-lightText" : "bg-darkItems text-darkText"}
                   w-[190px] h-full z-10 rounded-sm ml-2 shadow-sm cursor-pointer`} onClick={() => setShow(!show)}>
                    <div className="flex items-center justify-center h-full">
                        <div className="infos">
                            <div className="top flex text-[8px] mb-1 justify-between items-center">
                                <p>enjoy</p>
                                <FontAwesomeIcon icon={!show ? faCaretDown : faCaretUp} />
                            </div>
                            <h1 className="text-[10px] font-bold">{data?.username}</h1>
                        </div>
                        <img className="w-[35px] rounded-[50%] h-25px border-[1px] ml-3" 
                        src={
                            data?.profile_image ? data.profile_image
                            : 'http://localhost:8000/media/filo/default_profile_image.jpeg'
                        } 
                            alt="avatar" />
                    </div>
                    {
                        show && 
                        <ul className={`${theme === 'light' ? "bg-lightItems" : "bg-darkItems"} text-[10px] p-1 rounded-b-sm}`}>
                            <li>
                                <Link to="profile" className="flex w-full justify-between items-center px-4 my-4">
                                    <p>Pfrofile</p>
                                    <FontAwesomeIcon icon={faUser} />
                                </Link>
                            </li> 
                            <li>
                                <Link to="setings" className="flex w-full justify-between items-center px-4 my-4 ">
                                    <p>Setings</p>
                                    <FontAwesomeIcon icon={faGear} />
                                </Link>
                            </li>
                            <li className="flex w-full justify-between items-center px-4 my-4">
                                <p className="">Logout</p>
                                <FontAwesomeIcon icon={faRightToBracket} />
                            </li>
                            
                        </ul>
                    }
                </div>
            </div>
        </>
    )
}