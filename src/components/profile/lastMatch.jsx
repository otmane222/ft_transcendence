import React from 'react'
import { useContext } from 'react'
import {ThemeContext} from '../../Contexts/ThemeContext'

import Enemy from "../../assets/enemy.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

// import { CircularProgressWithChildren } from "react-circular-progressbar";

function History ( {date="01-01-2024 19:30", name="enemy", score=-10}) {
	const theme = useContext(ThemeContext);
	return (
		<div className={`mt-2 w-[90%] border-r-[0.5px]  ${score < 0 ? "border-r-[#db4658]" : "border-r-[#00AA30]"}  h-[50px] flex justify-between pr-3`}>
			<div className='self-center'>
				<img src={Enemy} alt="Description" className=" h-[20px] w-[20px] rounded-full" />
			</div>
			<div className=' ml-1 flex flex-col justify-around h-[60%] min-w-[30%] max-w-[45%] self-center'>
				<p className={`text-[10px] font-light ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>VS {name}</p>
				<div className='flex items-center '>
					<p className={`mr-[2px] text-[8px] font-light ${score < 0 ? "text-[#db4658]" : "text-[#00AA30]"}   `}>{score}</p>
					<FontAwesomeIcon className='w-[4px] ' icon={score < 0 ? faCaretDown : faCaretUp} style={{color: score < 0 ? "#db4658" : "#00AA30"}}  />
				</div>
			</div>
			<div className=' flex flex-col-reverse h-[85%] ml-1'>
				<p className={`text-[6px] font-light ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>{date}</p>
			</div>
		</div>
	)
}

export default function LastMatch() {
	const theme = useContext(ThemeContext);
	return (
		<div className={`mt-3 justify-center flex rounded-sm ${theme === 'light' ? "bg-lightItems" : "bg-darkItems"} h-[260px] py-4 w-full `}>
			<div className=' flex flex-col w-[80%]  h-full'>
				<div className='h-[25%] flex-colflex items-start '>
					<div className='h-[15px]'></div>
					<p className={`text-[12px] font-kaushan ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>Last Match</p>
				</div>
				<p className={`text-[10px] font-light ${theme === 'light' ? "text-lightText" : "text-darkText"} `}>Date</p>
				<div className='flex overflow-y-auto flex-col mt-2 items-end border-l-[0.5px] border-l-[#fbfbfb] '>
					<History name='Joker'/>
					<History score={10} name='Batman'/>
					<History score={-10}/>
					<History score={10}/>
				</div>
			</div>
		</div>
	)
}

