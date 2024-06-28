import React from 'react'
import { faGamepad } from "@fortawesome/free-solid-svg-icons"
import { faClock } from "@fortawesome/free-solid-svg-icons"
import {faTrophy} from "@fortawesome/free-solid-svg-icons"
import {faCertificate} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import {ThemeContext} from '../../Contexts/ThemeContext'

// import ReactApexChart from 'react-apexcharts'
import { LineChart } from '@mui/x-charts/LineChart';
import { styled } from '@mui/material/styles';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot } from '@mui/x-charts/LineChart';
import { useDrawingArea } from '@mui/x-charts/hooks';

import FriendStatus from "./friendProfile"
import Status from "./status"
import LastMatch from "./lastMatch"

import Avatar from "../../assets/avatar.png"
import Ava1 from "../../assets/ava1.png"
import Ava2 from "../../assets/ava2.png"
import Ava3 from "../../assets/ava3.png"
import Pic from "../../assets/profile.jpeg"




function InviteFriendCard( {name, winRate, avatar = Ava1}) {
	const theme = useContext(ThemeContext);
	return (
		<div className={`ml-2 mt-4 flex w-[91.5%] h-[150px] rounded-sm  ${theme === 'light' ? "bg-lightItems" : "bg-darkItems"}`}> 
			<div className=" w-[56%] flex flex-col items-center justify-center">
				<p className={`text-[15px] font-kaushan  mb-2 ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>{name}</p>
				<p className={`text-[12px]  ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>win rate</p>
				<p className={`text-[10px]  ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>{winRate}</p>
				<button className="bg-[#56A4FF] rounded-[8px] text-[14px] mt-[8px] pt-[3px] pb-[3px] pl-[17px] pr-[17px] text-darkText">Invite</button>
			</div>
			<div className="">
				<img src={avatar} alt="Description" className=" h-[135px]  mt-[-7px]" />
			</div>
		</div>
	);
}

function FriendCard( {name, winRate, avatar = Ava1}) {
	const theme = useContext(ThemeContext);
	return (
		<div className={`ml-2 mt-4 flex w-[91.5%] h-[150px] rounded-sm  ${theme === 'light' ? "bg-lightItems" : "bg-darkItems"} `}> 
			<div className=" w-[56%] flex flex-col">
				<div className="bg-[#C53F3F]     rounded-r-[10px]  h-[30px] w-[85%] flex items-center justify-center ">
				<p className={`text-[14px] mt-[2px] text-darkText `}>friend</p>
				</div>
				<div className="flex-col flex items-center justify-center grow">
					<p className={`text-[15px] font-kaushan  mb-2 ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>{name}</p>
					<p className={`text-[12px]  ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>win rate</p>
					<p className={`text-[10px]  ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>{winRate}</p>
				</div>
			</div>
			<div className="">
				<img src={avatar} alt="Description" className=" h-[135px]  mt-[-7px]" />
			</div>
		</div>
	);
}



function PlayerStatus() {
	const theme = useContext(ThemeContext);

    return (
		<div className=" flex flex-col mr-1 h-[750px] ">
			<div className={` flex rounded-sm ml-[1px] mt-[15px] w-[760px] h-[550px] ${theme === 'light' ? "bg-lightItems" : "bg-darkItems"}`}>
				<div className=" self-center h-[90%] w-[65%] min-w-[180px] flex flex-col justify-start items-center">
					<div className=" grow h-[20px] w-[85%] flex justify-between items-center ">
							<div className="w-[10%]">
								<img src={Pic} alt="Description" className=" h-[95%] w-[92%] rounded-full" />
							</div>
							<div className=" flex flex-col justify-between h-[45%] w-[87%] ">
								<p className={`text-[10px] font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>enjoy</p>
								<p className={`text-[12px] font-semibold  ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>aamhamdi</p>
								
							</div>
					</div>
					<div className="flex flex-col  flex-wrap grow h-[30px] w-[85%]">
						<div className="  flex  justify-between items-center h-[20px] mb-[2%]">
							<p className={`text-[10px] font-light ${theme === 'light' ? "text-lightText" : "text-darkText"} `}><span className="text-[15px] text-[#ff0000]"> 30</span>/100</p>
							<p className={`text-[13px] font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>4.30 LVL</p>
						</div>
						<div className={`${theme === 'light' ? "bg-[#D9D9D9]" : "bg-[#ffffff]"} max-h-[20px]  h-[20px] rounded-[7px] mt-[1px]`}>
							<div className={` bg-[#C53F3F] h-full rounded-[6px] w-[30%] `}></div>
						</div>
					</div>
					<div className="w-[85%] h-[200px] flex flex-col">
						<p className={`text-[14px] font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>Progress</p>
						<div className='h-[100%] w-[120%] ml-[-45px]'>
							<LineChart
								leftAxis={null}
								bottomAxis={null}
								series={[
									{ curve: "linear", data: [0, 1, 6, 3, 9.3, 3, 0, 10, 10, -10, 10,0, 1, 6, 3, 9.3, 3, 0, 10, 10, -10, 10, 2, 10], color: '#ffffff' },
									
								]}
							/>
							{/* <ResponsiveChartContainer
								
								series={[
									{
									curve: "linear",
									type: 'line',
									data: [80, 73, 78, 70, 60, 60, 70, 80, 90, 40, 70, 30, 10, 60, 90, 20, 10, 100, 10, 0, 10, 60, 30, 40, 0, 60, 40, 80, 30, 10],
									color: '#ffffff'
									},
								]}
								xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,14,15,16,17,18,19, 20,21,22,23,24,25,26,26,27,28,29 ] }]}
							>
								<LinePlot />
							</ResponsiveChartContainer> */}
						</div>
					</div>
					<div className=" grow w-[85%] h-[20px] flex">
						<div className="w-[15%]  flex flex-col justify-center">
							<p className={`text-[10px] font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>Win</p>
							<div className="flex items-center">
								<FontAwesomeIcon icon={faTrophy} style={{color: "#db4658"}} className="w-[13px] ml-[1px] mr-[2px]" />
								<p className={`text-[10px] ml-1 font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>11</p>
							</div>
						</div>
						<div className="w-[15%] bg  flex flex-col justify-center max-w-[22%] grow">
							<p className={`text-[10px] font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>Time</p>
							<div className="flex items-center">
								<FontAwesomeIcon icon={faClock}  style={{color: "#db4658"}}className="w-[12px] ml-[1px] mr-[2px]" />
								<p className={`text-[10px] ml-1 font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>2h 30 min</p>
							</div>
						</div>
						<div className="w-[30px] flex flex-col justify-center">
							<p className={`text-[10px] font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>Rate</p>
							<div className="flex items-center">
								<FontAwesomeIcon icon={faCertificate} style={{color: "#db4658"}}className="w-[12px] ml-[1px] mr-[2px]" />
								<p className={`text-[10px] ml-1 font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>5</p>
							</div>
						</div>
					</div>
				</div>
				<div className="w-[40%]">
					<img src={Avatar} alt="Description" className=" h-[80%] mt-[-3%] " />
				</div>
			</div>
			<Status/>
		</div>
    )
}

export default function Profile() {
	const theme = useContext(ThemeContext);
	let name = "Jemmy"
	let winRate = "50%"
	let avatar = [Ava1, Ava2, Ava3]
	return (
		<div className="flex w-[969px] h-ful ">
			<PlayerStatus />
			<div className=" flex-col flex  w-[200px] shrink-0  ">
				<FriendCard name={name} winRate={winRate} avatar={avatar[1]}/>
				<InviteFriendCard name={"CatWomen"} winRate={winRate} avatar={avatar[0]}/>
				<FriendCard name={"Batman"} winRate={winRate} avatar={avatar[2]}/>
			</div>
		</div>
	)
}