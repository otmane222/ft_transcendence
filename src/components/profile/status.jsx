import React from 'react'
import { useContext } from 'react'
import {ThemeContext} from '../../Contexts/ThemeContext'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faFire} from "@fortawesome/free-solid-svg-icons"

import {
	CircularProgressbar,
	CircularProgressbarWithChildren,
	buildStyles
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";


function Stats ({day="mon", date="10", fire=false}) {
	const theme = useContext(ThemeContext);
	return (
		<div className=' flex flex-col items-center w-full'>
			<FontAwesomeIcon icon={faFire} style={{color: fire === false ? theme === 'light' ? "#5A5959": "#ffffff" : "C53F3F"}} className='h-[24px]' />
			<p className={`text-[13px] font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>{day}</p>
			<p className={`text-[13px] font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>{date}</p>
		</div>
	)
}

export default function Status() {
	const theme = useContext(ThemeContext);
	return (
		<div className={`flex w-[760px]  h-[280px] shrink-0 flex-col rounded-sm ml-[1px] mt-3 ${theme === 'light' ? "bg-lightItems" : "bg-darkItems"} `}>
			<div className='ml-5 mt-2 '>
					<p className={`text-[25px] font-kaushan ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>More Infos</p>
			</div>
			<div className='flex h-[200px]'>
				<div className='w-[35%]  flex flex-col '>
					<div className='  grow flex items-center justify-center'>
						<div className='w-[40%]  h-[50%] rounded-full '>
						<CircularProgressbarWithChildren styles={buildStyles({pathColor: "#C53F3F",strokeLinecap: "butt"})} strokeWidth={13}  value={30} >
						
							<p className={`text-[13px] font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>Your Rank</p>
							<p className={`text-[18px] font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>30/100</p>
							
						</CircularProgressbarWithChildren>
						</div>
					</div>
				</div>
				<div className=' flex w-[60%] h-full items-center justify-center'>
					<div className='w-[90%]   h-[60%] flex flex-col justify-start'>
						<div className='flex h-[35px]'>
							<p className={`text-[15px] font-thin ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>Last Week</p>
						</div>
						<div className='flex  w-[110%] ml-[-12px] '>
							<Stats/>
							<Stats fire date='11' day='tur'/>
							<Stats date='12' day='wed'/>
							<Stats date='13' day='thr'/>
							<Stats fire date='14' day='fri'/>
							<Stats date='15' day='sat'/>
							<Stats fire date='16' day='sun'/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
// Compare this snippet from src/components/chat/chat.jsx:
