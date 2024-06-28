import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage, faSun, faPalette } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom'


export default function Nav() {
    const location = useLocation();
    return (
        <div className="nav flex justify-between items-center  w-fill h-[5vh] p-2 border-b-[.5px] border-gray-100">
            <Link to="/">
                <div className="logo text-primary uppercase text-sm font-semibold font-serif">Pong</div>
            </Link>
            <div className="actions w-[100px] px-1">
                <ul className="flex justify-between items-center ">
                    <li className='text-gray-500 text-[10px]'><FontAwesomeIcon icon={faLanguage} /></li>
                    <li className='text-gray-500 text-[10px]'><FontAwesomeIcon icon={faSun} /></li>
                    <li className={`bg-primary rounded text-white text-[6px] p-1 uppercase`}>
                        <Link to={location.pathname.includes("login") ? "signup" : "login"}>
                            <button >{location.pathname.includes("login") ? "signup" : "login"}</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}