
import { Outlet } from "react-router-dom"
import FriendsList from "../components/chat/FriendsList"
import axios from 'axios';
import React, { useState } from 'react';


// const refreshAccessToken = async () => {
//     try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         const response = await axios.post('http://localhost:8000/auth/refresh/', {
//             refresh: refreshToken
//         });
//         const { access } = response.data;
//         localStorage.setItem('accessToken', access);
//         return access;
//     } catch (error) {
//         console.error('Error refreshing token:', error);
//         // Handle token refresh failure (e.g., log out the user)
//         return null;
//     }
// };

export default function ChatLayout() {

    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleSelectUser = async (userId) => {
        setSelectedUserId(userId);
        
        try {
            const response = await axios.post('http://localhost:8000/chat/create/', {
                participants: userId  // This is "jaja"'s userId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            const chatId = response.data.chat_id;
            console.log('Chat created with ID:', chatId);
            // Navigate to the chat or handle it as needed
        } catch (error) {
            console.error('Error starting chat:', error.response ? error.response.data : error);
        }
    };

    return (
        <>
            <div className="flex justify-between w-full h-[94vh] mt-2">
                <Outlet />
                <FriendsList  onSelectUser={handleSelectUser}/> 
            </div>
        </>
    )
}
