
import { Outlet } from "react-router-dom"
import FriendsList from "../components/chat/FriendsList"
import axios from 'axios';
import React, { useState } from 'react';




export default function ChatLayout() {



    return (
        <>
            <div className="flex justify-between w-full h-[94vh] mt-2">
                <Outlet />
                <FriendsList  /> 
            </div>
        </>
    )
}
