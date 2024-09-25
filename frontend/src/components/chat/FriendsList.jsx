import { useState, useContext, useEffect } from "react"
import {ThemeContext} from '../../Contexts/ThemeContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from 'axios';

function FriendItem({data, onSelectUser}) {
    return (
        //<Link to={`${data.id}`}>
            <li className="w-full h-[50px] mt-2 flex justify-center items-center cursor-pointer"
            onClick={() => onSelectUser(data.id)}
            >
                <div className="img relative w-[35px] h-[35px] m-1">
                    <img src={
                            data?.profile_image || 'http://localhost:8000/media/filo/default_profile_image.jpeg'
                        }
                        className="w-[35px] h-[35px] rounded-[50%]" alt="img"
                    />
                    <div className={`dot w-[10px] h-[10px] rounded-full absolute top-[30px] ${data.is_active !== true ? "bg-rose-400" : "bg-teal-400"}`}></div>
                </div>
                <div className="content text-[10px] w-[70px]">
                    <h1 className="font-bold ">{data.username}</h1>
                    <p className="text-[7px] mt-1">{data.is_active}</p>
                </div>
            </li>
        // </Link>
    )
}

export default function FriendsList({ onSelectUser }) {

    const [users, setUsers] = useState(null);
    const theme = useContext(ThemeContext);

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
            setError(error)
            // Handle error (e.g., log out the user if refresh fails)
        }
    };

	const fetchData = async (retry = true) => {
		const token = localStorage.getItem('accessToken');
		try {
			const response = await axios.get('http://localhost:8000/auth/users/', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setUsers(response.data);
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
	// if (users){
	// 	console.log(users)
	// }

    return (
        <div className={`
            friends shadow-sm w-[190px] p-1 ml-2
            ${theme === 'light' ? "bg-lightItems text-lightText" : "bg-darkItems text-darkText"} 
        `}>
            <div className="header w-full h-[60px] flex justify-between items-center text-[12px] px-4">
                <h1 className="font-kaushan">All Users</h1>
                <FontAwesomeIcon icon={faUserGroup} />
            </div>
            <ul>
                {users?.length > 0 ? (
                    users.map(user => <FriendItem  key={user.id} data={user} onSelectUser={onSelectUser} />)
                ) : (
                    <li>No users found</li>
                )}
            </ul>
        </div>
    );
}
// const initData = [
//     {id:0, name: 'aamhamdi', img:'/aamhamdi1.jpeg', status:'active'},
//     {id:1, name: 'aamhamdi', img:'/aamhamdi1.jpeg', status:'last seen 19:24'},
//     // {id:2, name: 'aamhamdi', img:'/aamhamdi1.jpeg', status:'active'},
// ]