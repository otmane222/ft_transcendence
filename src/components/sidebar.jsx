

import { 
	faHome,
	faGamepad,
	faGear,
	faMoon,
	faRightToBracket,
	faEnvelope,
	faSun,
	faBars
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'
import {ColorContext, ThemeContext, ThemeToggelContext} from '../Contexts/ThemeContext'


function SideBar() {
	const location = useLocation();
	const theme = useContext(ThemeContext);
	const color = useContext(ColorContext)
	const themeHanlder = useContext(ThemeToggelContext);
	return (
    <>
		<div className={`w-[60px] min-h-[667px] h-[99vh] inline-flex items-start justify-start shrink-0`}>
			<header 
				className={`w-full h-full shadow-sm rounded-sm relative ${theme === 'light' ? "bg-lightItems text-lightText" : "bg-darkItems text-darkText"}`}>
				<div className="cursor-pointer flex items-center justify-center w-full text-[22px] my-6">
					<h1 className={`mx-4 text-[28px] font-insp ${color}`}>Pong</h1>
				</div>
						<div className="menu w-full mt-20 h-[180px] text-[20px] flex flex-col items-center justify-between">
							<Link to="profile" className={`${location.pathname.includes("profile") && color} text-center`}> 
								<FontAwesomeIcon icon={faHome} />
								<p className='text-[10px]'>Profile</p>
							</Link>
							<Link to="game" className={`${location.pathname.includes("game") && color} text-center`}> 
								<FontAwesomeIcon icon={faGamepad} />
								<p className='text-[10px]'>Play</p>
							</Link>
							<Link to="chat" className={`${location.pathname.includes("chat") && color} text-center`}>
								<FontAwesomeIcon icon={faEnvelope} />
								<p className='text-[10px]'>Chat</p>
							</Link>
						</div> 
						<div className="menu w-full text-[20px] h-[180px] flex flex-col items-center justify-between bottom-2 absolute">
							<button className='w-full ' onClick={() => {
								if (theme == 'light')
									themeHanlder('dark')
								else
								themeHanlder('light');
						}}>
								<FontAwesomeIcon icon={theme === 'dark' ? faMoon : faSun} />
								<p className='text-[10px]'>Theme</p>
							</button>
							<Link to="setings" className={`${location.pathname.includes('setings') && color} text-center`}>
								<FontAwesomeIcon  icon={faGear} />
								<p className='text-[10px]'>setings</p>
							</Link>
							<a className='text-center'>
								<FontAwesomeIcon icon={faRightToBracket} />
								<p className='text-[10px]'>Logout</p>
							</a>
						</div>
			</header>
		</div>
    </>
)}

export default SideBar
