import { faClone, faClose, faGamepad, faTableTennisPaddleBall } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import {ColorContext, ThemeContext} from '../../Contexts/ThemeContext'
import HeroImg from "../assets/HeroImg1"
import FriendImg from '../assets/FriendImg'
import AiImg from "../assets/AiImg"
import TornmentImg from "../assets/TornmentImg"
import { Link } from "react-router-dom"


function Player() {
    
    const color = useContext(ColorContext).substring(6, 13)
    return (
        <div>
            <div className="flex justify-center items-center">
                <div style={{background:color}} className="w-12 text-white h-12 rounded-sm p-1 text-[20px] flex justify-center items-center">
                    <FontAwesomeIcon icon={faTableTennisPaddleBall} />
                </div>
            </div>
            <p className="text-[10px] font-bold uppercase mt-2 text-center">Player 1</p>
            <p className="text-[8px] text-center">waiting...</p>
        </div>
    )
}

function WaitingRoom({handler}) {
    const theme = useContext(ThemeContext)
    const color = useContext(ColorContext).substring(6, 13)
    return (
            <div className={`${theme == 'light' ? "bg-lightItems/30 text-lightText border-black/20" : "bg-darkItems/30 text-darkText border-white/20"} border-[.3px] shadow-sm  backdrop-blur-md p-2 rounded-sm fixed w-[50vw] h-[30vw] top-[50%] left-[40%] translate-x-[-54%] translate-y-[-50%]`}>
                <div className="header text-[15px] text-right flex justify-end items-center h-[2vw]">
                    <div className=" w-4 h-4 flex justify-center items-center" onClick={() => handler('')}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                </div>
                <div className="flex justify-center items-center h-[27vw]">
                    <div className="w-[50%]">
                        <AiImg color={color}  />
                    </div>
                    <div className="h-full w-[50%] px-4 flex justify-center items-center">
                        <div>
                            <div className="text-[10px] py-1">
                                <p>room id :</p>
                                <div className="mt-2 flex justify-between bg-white text-black p-1 h-[40px] rounded-sm items-center">
                                    <p className="w-[80%] text-[10px] overflow-hidden">http://localhost:5173/dashboard/game/room/1</p>
                                    <button style={{background:color}} className="text-[10px] h-[30px] w-fit p-1 ml-1 rounded-sm text-white">
                                        copy
                                        <FontAwesomeIcon className="ml-2" icon={faClone} />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white p-4 text-black min-h-[70px] h-fit px-3 items-center rounded-sm flex justify-between">
                                <Player />
                                <Player />
                                <Player />
                            </div>
                            <Link to="../tournment">
                                <button style={{
                                    background: color,
                                }} className={`mt-2 w-full rounded-sm text-[14px] capitalize h-8`}>Play</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )       
}

const memebersOption = [
    {id:0, num:4, text:'four 4', checked:true},
    {id:1, num:8, text:'four 8', checked:false},
    {id:2, num:16, text:'four 16', checked:false},
]
const roundsOption = [
    {id:0, num:3, text:'two 3', checked:true},
    {id:1, num:5, text:'three 5', checked:false},
    {id:2, num:7, text:'five 7', checked:false},
]

function RadioSelect({options, text}) {
    return (
        <fieldset className="text-[14px] my-6">
            <legend>{text}</legend>
            {
                options?.map(item => {
                    return (
                        <div className="mt-2">
                            <input type="radio" id={item.num} checked={item.checked} value={item.num} className="mr-2" />
                            <label for={item.num} >{item.text}</label>
                        </div> 
                    )
                })
            }
        </fieldset>
    )
}

function CreatRoom({handler}) {

    const color = useContext(ColorContext).substring(6, 13)
    const [members, setMembers] = useState(2)
    const [rounds, setRounds] = useState(3)
    const theme = useContext(ThemeContext)

    return (
        <div className={`${theme == 'light' ? "bg-lightItems/30 text-lightText border-black/20" : "bg-darkItems/30 text-darkText border-white/20"} border-[.3px] shadow-sm  backdrop-blur-md p-2 rounded-sm absolute w-[65vw] h-[40vw] top-[50%] left-[40%] translate-x-[-40%] translate-y-[-50%]`}>
            <div className="header text-[22px] text-right flex justify-end items-center h-[4vw] ">
                <div className=" w-4 h-8flex justify-center items-center" onClick={() => handler('')}>
                    <FontAwesomeIcon icon={faClose} />
                </div>
            </div>
            <div className="flex justify-center w-full items-center h-[35vw]">
                <div className="w-[100%] h-full flex justify-center items-center">
                    <AiImg color={color}  />
                </div>
                <div className="w-[80%] px-5 text-[22px]">
                    <h1 className="font-kaushan">Room infos :</h1>
                    <RadioSelect options={memebersOption} text="Select members number :" />
                    <RadioSelect options={roundsOption} text="Select rounds number :" />
                    <button style={{
                        background: color,
                    }} className={`mt-2 w-[200px] rounded-sm text-[14px] text-white capitalize h-10`} onClick={() => handler('waiting')}>create room</button>
                </div>
            </div>
        </div>
    )
}



function Hero({color}) {
    
    return (
        <div className=" hero mt-4 border-[.5px] shadow-sm border-gray-600 h-2/3 sm:h-1/2 max-h-[800px] sm:max-h-[500px]  bg-hero bg-cover rounded-sm">
            <div className="flex items-center justify-center h-full w-full backdrop-blur-md rounded-sm p-1 bg-[#141323]/65">
                <div className="grid place-items-center sm:flex items-center justify-center max-w-[1500px] ">
                    <div className="img overflow-y-visible w-[50%] h-[350px] p-2 sm:mr-4 flex justify-center items-center">
                        <HeroImg color={color} />
                    </div>
                    <div className="centent w-[50%] h-full leading-snug text-white p-7 flex justify-between items-center">
                        <div className="">
                            <p className="text-[.7rem] font-light">welcome to pong comunity</p>
                            <h3 className="text-[3rem] font-kaushan">its time to play ping pong</h3>
                            <button style={{backgroundColor : color}} className={`flex justify-between h-[3rem] w-[8rem] items-center p-2 px-4 text-white rounded-2xl mt-10`}>
                                <p className="mr-2 text-[1rem] capitalize font-kaushan">Play now</p>
                                <FontAwesomeIcon className="text-[1rem]" icon={faGamepad} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Card({text , img, color, handler}) {
    const theme = useContext(ThemeContext);
    return(
        <div className={`card h-[400px]  p-2 w-full rounded-sm shadow-sm ${theme === 'light' ? "bg-lightItems" : "bg-darkItems"}`}>
            <div className="img w-full h-2/3 flex items-center justify-center ml-[50%] translate-x-[-50%] m-2">
                {img}
            </div>
            <div className="card-body w-full">
                <div className="content mt-2 w-full text-center text-[20px]">
                    <h1 className="capitalize font-kaushan">{text}</h1>
                    <p className="text-[10px] mt-2">Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="action flex items-end justify-center">
                    <button style={{backgroundColor : color}} className="text-[12px] w-[50%] mt-5  h-fit py-2 rounded-sm uppercase text-white flex justify-center items-center" onClick={() => handler('create')} >
                        paly 
                        <FontAwesomeIcon icon={faGamepad} className="ml-1 text-[20px]" />
                    </button>
                </div>
            </div>
        </div>
    )
}


function Cards({color, handler}) {
    const theme = useContext(ThemeContext)
    return (
        <div className={`cards my-8 ${theme === 'light' ? "text-lightText" : "text-darkText"}`}>
            <div className={`header mx-4 ${""}`}>
                <h1 className="font-kaushan text-[20px]">game modes:</h1>
                <p className="text-[10px] my-4">pick a game to play in</p>
            </div>
            <div className="cards mt-8 grid grid-flow-col-1 px-10 lg:grid-cols-2 lg:px-0 xl:grid-cols-3 xl:px-0 gap-4">
                <Card text="play vs friend" img={<FriendImg color={color} />} color={color} handler={handler} />
                <Link to="room/1">
                    <Card text="play vs ai" img={<AiImg color={color} />}  color={color}  />
                </Link>
                <Card text="play on tornemnt" img={<TornmentImg color={color} />} color={color} handler={handler} />
            </div>
        </div>
    )
}


export default function Game() {
    const color = useContext(ColorContext).substring(6, 13)
    const [step, setStep] = useState(null)
    return (
        <>
            <div className="game w-full h-[94vh] mt-2 overflow-y-auto relative">
                <div className=" h-full mx-auto relative">
                    <Hero color={color} />
                    <Cards color={color} handler={setStep} />
                    {
                        step === 'create' && <CreatRoom handler={setStep} /> ||
                        step === 'waiting' && <WaitingRoom handler={(setStep)} />
                    }
                </div>
            </div> 
        </>
    )
}