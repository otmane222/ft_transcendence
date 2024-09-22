import React, { useState } from 'react';
import { faCheck, faClock } from "@fortawesome/free-solid-svg-icons"
import {faTrophy} from "@fortawesome/free-solid-svg-icons"
import {faCertificate} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import {ColorContext, ThemeContext} from '../../Contexts/ThemeContext'

// import ReactApexChart from 'react-apexcharts'
import { LineChart } from '@mui/x-charts/LineChart';
import Status from "./status"
import  { useEffect } from "react";
import axios from "axios";



// function InviteFriendCard( {name, winRate, avatar = Ava1}) {
// 	const theme = useContext(ThemeContext);
// 	return (
// 		<div className={`ml-2 mt-4 flex w-[91.5%] h-[150px] rounded-sm  ${theme === 'light' ? "bg-lightItems" : "bg-darkItems"}`}> 
// 			<div className=" w-[56%] flex flex-col items-center justify-center">
// 				<p className={`text-[15px] font-kaushan  mb-2 ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>{name}</p>
// 				<p className={`text-[12px]  ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>win rate</p>
// 				<p className={`text-[10px]  ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>{winRate}</p>
// 				<button className="bg-[#56A4FF] rounded-[8px] text-[14px] mt-[8px] pt-[3px] pb-[3px] pl-[17px] pr-[17px] text-darkText">Invite</button>
// 			</div>
// 			<div className="">
// 				<img src={avatar} alt="Description" className=" h-[135px]  mt-[-7px]" />
// 			</div>
// 		</div>
// 	);
// }


function Achivments() {
	const theme = useContext(ThemeContext)
	return (
		<>
			<div className={`${theme == 'light' ? "bg-lightItems text-lightText" : "bg-darkItems text-darkText border-darkText/30"} w-full max-h-[400px] overflow-scroll h-fit rounded-sm p-4`} >
				<div className="header my-6 font-kaushan text-[15px]">
					<h1>Achivments</h1>
				</div>
				<ul className='mt-4'>
				{
					achivments.map(a => {
						return (
							<li key={a.id} className='my-6 flex items-center justify-between px-6'> {/* Added key here */}
								<div className='flex items-center'>
									{/* <img src={src={data?.profile_image || 'http://localhost:8000/media/profile_images/default.jpg'}} className='w-[45px]' alt="" /> */}
									<div className='ml-4'>
										<h1 className='text-[13px]'>{a.title}</h1>
										<p className='text-[10px] mt-1'>{a.des}</p>
									</div>
								</div>
								<h1 className='ml-10 text-[12px]'>{a.rec}</h1>
								<div className='w-[120px] text-center'>
									{a.achived 
										? <div className='ml-6 text-[12px] text-emerald-600'>achived <FontAwesomeIcon icon={faCheck} /> </div> 
										: <div className='ml-6 text-[12px]'>not achived yet</div>
									}
								</div>
							</li>
						)
					})
				}
			</ul>
			</div>
		</>
	)
}


export function PlayerStatus( {toggleExpanded, expand} ) {
	const theme = useContext(ThemeContext);
	const chartColor = theme == 'light' ? "#374151" : "#ffffff"
	const color = useContext(ColorContext).substring(6,13)

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
	if (data){
		console.log(data)
	}
	
	
    return (
		<div className=" flex flex-col w-full h-full flex-grow overflow-scroll"> 
			<div className={`flex rounded-sm w-full max-h-[550px] h-fit ${theme === 'light' ? "bg-lightItems" : "bg-darkItems border-darkText/30"}`}>
				<div className="w-[65%] min-w-[180px] flex flex-col px-10 py-2">
					<div className="h-[50px] w-[85%] flex justify-between items-center ">
							<div className="w-[10%]">
							<img 
								src={
								data?.profile_image ? data.profile_image
								: 'http://localhost:8000/media/filo/default_profile_image.png'} 
								alt="Profile" 
								className="h-[95%] w-[92%] rounded-full shadow-sm"
							/>
							</div>
							<div className=" flex flex-col justify-between h-[45%] w-[87%] ">
								<p className={`text-[10px] font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>Hello</p>
								<p className={`text-[12px] font-semibold  ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>{data?.username || 'username'}</p>
								
							</div>
					</div>
					<div className="flex flex-col flex-wrap mt-4">
						<div className=" flex justify-between items-center h-[20px]">
							<p className={`text-[10px] font-light ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>
								<span style={{color:color}} className="text-[15px]">30</span>
								/100
							</p>
							<p className={`text-[13px] font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>4.30 LVL</p>
						</div>
						<div className={`${theme === 'light' ? "bg-lightText" : "bg-[#ffffff]"} max-h-[20px] h-[10px] rounded-[7px] mt-2 shadow-sm`}>
							<div style={{background:color}} className={`h-full rounded-[6px] w-[30%] `}></div>
						</div>
					</div>
					<div className="w-[85%] h-[200px] flex flex-col mt-2">
						<p className={`text-[14px] font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>Progress</p>
						<div className='h-[100%] w-[120%] ml-[-45px]'>
							<LineChart
								leftAxis={null}
								bottomAxis={null}
								series={[
									{ curve: "linear", data: [0, 1, 6, 3, 9.3, 3, 0, 10, 10, -10, 10,0, 1, 6, 3, 9.3, 3, 0, 10, 10, -10, 10, 2, 10], color: chartColor },
									// { curve: "linear", data: [0, 0], color: chartColor },
									
								]}
							/>
						</div>
					</div>
					<div className="h-[50px] flex justify-between w-[60%]">
						<div className="text-[12px] flex flex-col justify-center">
							<p className={`font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>Win</p>
							<div className="flex items-center mt-2">
								<FontAwesomeIcon icon={faTrophy} style={{color: color}} className="ml-[1px] mr-[2px]" />
								<p className={`ml-1 font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>11</p>
							</div>
						</div>
						<div className="text-[12px] flex flex-col justify-center">
							<p className={`font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>Time</p>
							<div className="flex items-center mt-2">
								<FontAwesomeIcon icon={faClock}  style={{color: color}}className="ml-[1px] mr-[2px]" />
								<p className={`ml-1 font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>2h 30 min</p>
							</div>
						</div>
						<div className="text-[12px] flex flex-col justify-center">
							<p className={`font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>Rate</p>
							<div className="flex items-center mt-2">
								<FontAwesomeIcon icon={faCertificate} style={{color: color}}className="ml-[1px] mr-[2px]" />
								<p className={`ml-1 font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>5</p>
							</div>
						</div>
					</div>
				</div>
				<div className="w-[40%] flex justify-center">
					<img src="/ava2.png" alt="Description" className="h-[350px]" />
				</div>
			</div>
			
		</div>
    )
}


const achivments = [
	{id:0,title:'Bill Gates 3', des:'be active for more 3,5,7 days', rec : '1/2 ', achived:false, icon:'/fire.png'},
	{id:1,title:'Bill Gates 3', des:'be active for more 3,5,7 days', rec : '2/2', achived:true, icon:'/crow.png'},
	{id:2,title:'Bill Gates 3', des:'be active for more 3,5,7 days', rec : '6/6', achived:true, icon:'/medal.png'},
	{id:3,title:'Bill Gates 3', des:'be active for more 3,5,7 days', rec : '0/2', achived:false, icon:'/thumb-up.png'},
]


export default function Profile() {
	const [expand, setExpand] = useState(false)

	const toggleExpanded = () => {
		setExpand(!expand)
	}
	return (
		<div className="flex flex-grow justify-center h-full w-full mr-2">
			<div className='w-full'>
				<Status toggleExpanded={toggleExpanded} expand={expand}  />
				<Achivments />
			</div>
			{/* <PlayerStatus toggleExpanded={toggleExpanded} expand={expand} />	 */}
		</div>
	)
}