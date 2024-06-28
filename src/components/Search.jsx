import { faSearch, faCaretDown, faUser, faGear, faRightToBracket, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { ColorContext, ThemeContext } from "../Contexts/ThemeContext";
import { Link } from "react-router-dom";

export default function Search() {
    const theme = useContext(ThemeContext)
    const [show, setShow] = useState(false)
    const color = useContext(ColorContext).substring(6,13);
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
                    <input type="text" placeholder="search..." className="bg-transparent border-none text-[10px] ml-1 focus:outline-none" />
                </div>
                <div className={`
                    ${theme === 'light' ? "bg-lightItems text-lightText" : "bg-darkItems text-darkText"}
                   w-[150px]  h-full z-10 rounded-sm ml-2 shadow-sm cursor-pointer`} onClick={() => setShow(!show)}>
                    <div className="flex items-center justify-center h-full">
                        <div className="infos">
                            <div className="top flex text-[8px] mb-1 justify-between items-center">
                                <p>enjoy</p>
                                <FontAwesomeIcon icon={!show ? faCaretDown : faCaretUp} />
                            </div>
                            <h1 className="text-[10px] font-bold">aamhamdi</h1>
                        </div>
                        <img className="w-[35px] rounded-[50%] h-25px border-[1px] ml-3" src="/aamhamdi1.jpeg" alt="avatar" />
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