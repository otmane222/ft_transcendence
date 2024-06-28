import Nav from "./nav";
import Picture from "./picture";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle , faAirbnb } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk, faKey } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="w-screen h-screen">
            <div className="main bg-white container bor mx-auto h-full max-w-2xl">
                {/* <Nav text="signup" url="/signup" /> */}
                <div className="login h-[95vh] sm:flex sm:justify-between">
                    <div className="pic h-1/2 sm:h-[85vh] sm:w-3/5  flex items-center justify-between">
                        <Picture color="#C53F3F" />
                    </div>
                    <div className="login-form p-1 h-1/2 sm:h-[95vh] sm:w-2/5 flex items-center">
                        <div className="w-full">
                            <div className="heading w-1/1 p-1 text-center">
                                <h1 className="text-4xl font-semibold text-gray-700">HELLO</h1>
                                <p className="text-[8px] text-gray-500">welcome to ping pong comunity</p>
                            </div>
                            <div className="Oauth w-1/2 mx-auto mt-2">
                                <div className="login-google uppercase text-white h-5 bg-blue-500 w-1/1 rounded flex items-center justify-center">
                                    <h5 className="text-[5px]  mr-2">login with google account</h5>
                                    <i className="text-[8px]"><FontAwesomeIcon icon={faGoogle} /></i>
                                </div>
                                <div className="login-42 uppercase bg-primary h-5 mt-2 rounded w-1/1 flex items-center justify-center text-white">
                                    <h5 className="text-[5px]  mr-2">login with 42 account</h5>
                                    <i className="text-[8px]"><FontAwesomeIcon icon={faAirbnb} /></i>
                                </div>
                                <div className="login-form text-gray-600 grid mt-2 w-full">
                                    <label className="text-[6px] flex justify-between px-2" htmlFor="email">email : <FontAwesomeIcon icon={faMailBulk} /></label>
                                    <input className="mt-1 text-[6px] px-2 rounded h-5 border-gray-300 border-[.5px]" type="email" id="email" placeholder="example@gmail.com" />
                                    <label className="text-[6px] mt-2 flex justify-between px-2 " htmlFor="password">password : <FontAwesomeIcon icon={faKey} /></label>
                                    <input className="mt-1 text-[6px] px-2 rounded h-5 border-gray-300 border-[.5px]" type="password" id="password" placeholder="***********" />
                                    <a className="text-[6px] mt-2" href="#">Forget password ?</a>
                                    <button className="bg-gray-600 mt-2 rounded text-[8px] h-5 text-white">LOGIN</button>
                                    <p className="text-[6px] mt-2">You already have account <Link to="/signup" className="text-blue-500">signup</Link> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}