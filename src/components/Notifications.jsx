import { faBell, faCaretDown, faCheck, faTrash, faUserPlus, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";


function NotItem({data}) {
    return (
        <li className="flex justify-between max-w-[260px] ml-[50%] translate-x-[-50%] items-center w-full p-1 h-10 my-3">
            <img src={data.img} alt="user" className="h-8 w-8 rounded-[50%]" />
            <div className="text text-[10px]">
                <h1 className="font-bold">{data.type}</h1>
                <p className="text-[8px] mt-1">Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="date">
                <p className="text-[7px]">{data.date}</p>
            </div>
        </li>
    )
}

function InviteItem({data}) {
    return (
        <li className="flex justify-between max-w-[260px] ml-[50%] translate-x-[-50%] items-center w-full p-2 h-10 my-3">
            <img src={data.img} alt="user" className="h-8 w-8 rounded-[50%]" />
            <div className="text text-[10px]">
                <h1 className="font-bold">{data.user}</h1>
                <p className="text-[8px] mt-1"> {data.user} sent a friend request</p>
            </div>
            <div className="actions flex items-center justify-between px-2 w-[55px] text-[12px]">
                <FontAwesomeIcon className="" icon={faCheck} />
                <FontAwesomeIcon className="" icon={faTrash} />
            </div>
        </li>
    ) 
}

export default function Notifications() {
    const notifications = window.localStorage.getItem('showNotifications')
    if (notifications === null)
        window.localStorage.setItem('showNotifications', false);
    const theme = useContext(ThemeContext)
    const [nots, setNots] = useState(initNots)
    const [show, setShow] = useState(notifications == 'true')

    function handler(value) {
        setShow(value)
        window.localStorage.setItem('showNotifications', value);
    }

    return (
        <div className={`min-h-[60px] rounded-sm ${theme === 'light' ? "bg-lightItems text-lightText" : " bg-darkItems text-darkText"} shadow-sm w-full` }>
            <div className="cursor-pointer flex justify-between w-full h-[50px] items-center px-4" onClick={() => handler(!show)}>
                <div className="content flex items-center text-[14px] relative">
                    <h1 className="mr-2 font-bold font-kaushan">Notifications</h1>
                    <FontAwesomeIcon icon={faBell} className="relative" />
                    <div className="dot text-white bg-rose-400 w-[12px] h-[12px] text-[10px] rounded-[50%] flex justify-center items-center">{nots.length}</div>
                </div>
                <FontAwesomeIcon className="text-[14px]" icon={!show ? faCaretDown : faCaretUp} />
            </div>
            {
                show === true && 
                <ul className="py-2">{nots.map(not => <NotItem key={not.id} data={not}/>)}</ul>
            }
        </div>
    )
}

export function Invites() {
    const showInvites = window.localStorage.getItem('showInvites')
    if(showInvites === null)
            window.localStorage.setItem('showInvites', false);
    const theme = useContext(ThemeContext)
    const [invites, setInvites] = useState(initInvites)
    const [show, setShow] = useState(showInvites == 'true')

    function handler(value) {
        setShow(value)
        window.localStorage.setItem('showInvites', value);
    }

    return (
        <div className={`w-full min-h-[60px] rounded-sm mt-2 ${theme === 'light' ? "bg-lightItems text-lightText" : " bg-darkItems text-darkText"} shadow-sm`}>
            <div className="header px-4 h-[50px] relative cursor-pointer flex text-[14px] justify-between w-full items-center" onClick={() => handler(!show)}>
                <div className="content flex items-center text-[14px] relative">
                    <h1 className="mr-2 font-bold font-kaushan">invites</h1>
                    <FontAwesomeIcon icon={faUserPlus} />
                    <div className="dot text-white bg-rose-400 w-[12px] h-[12px] text-[10px] rounded-[50%] flex justify-center items-center">{invites.length}</div>
                </div>
                <FontAwesomeIcon className="text-[14px]" icon={!show ? faCaretDown : faCaretUp} />
            </div>
            {
                show && 
                <ul className="my-2 pb-2">{invites.map(inv => <InviteItem key={inv.id} data={inv} />)}</ul>
            }
        </div>
    )
}

const initNots = [
    {id:0, type:'new frient request', img:'/aamhamdi1.jpeg', date:'2024-02-23 19:33'},
    {id:1, type:'invite to play', img:'/aamhamdi1.jpeg', date:'2024-02-23 19:33'},
    {id:2, type:'new message', img:'/aamhamdi1.jpeg', date:'2024-02-23 19:33'},
    {id:3, type:'new message', img:'/aamhamdi1.jpeg', date:'2024-02-23 19:33'},
]

const initInvites = [
    {id:0, user:'aamhamdi', img:'/aamhamdi1.jpeg'},
    {id:1, user:'aamhamdi', img:'/aamhamdi1.jpeg'},
]