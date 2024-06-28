import { 
    faArchive, 
    faCheckDouble, 
    faCircleXmark, 
    faCommentDots, 
    faEllipsisVertical, 
    faEye, 
    faTrash 
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useReducer, useState } from "react";
import {ColorContext, ThemeContext} from '../../Contexts/ThemeContext'
import Categories, {reducerHandler} from './Categories'
import { Link } from "react-router-dom";
import { ConversationsHandlerContext, ConversationsProvider } from "../../Contexts/ConversationsContext";


function SetingsListItem({text, icon, handler}) {

    const [isHoverd, setIsHoverd]  = useState(false)
    const color = useContext(ColorContext).substring(6,13)

    const ItemStyle = isHoverd ? {
        color: color,
        border : `${color} 1px solid`,
    } : {} 

    return (
        <li onClick={() => handler(text)} style={ItemStyle} className="flex justify-between mt-3 items-center rounded-sm hover:border-[1px] p-1" onMouseEnter={() => setIsHoverd(true)} onMouseLeave={() => setIsHoverd(false)}>
            <p className="text-[10px] capitalize">{text}</p>
            <FontAwesomeIcon icon={icon} />
        </li> 
    )
}

function SetingsList({data}) {

    const dispatch = useContext(ConversationsHandlerContext);
    function Handler(text) {
        dispatch({
            type : text,
            id : data.id,
        })
    }

    return (
        <ul className="bg-white/10 top-4 right-20 backdrop-blur-sm shadow-sm w-[140px] absolute z-10 px-3 py-3 rounded-sm text-[10px]">
            <SetingsListItem text="seen" icon={faEye} handler={Handler} />
            <SetingsListItem text="delete" icon={faTrash}  handler={Handler} />
            <SetingsListItem text="archive" icon={faArchive} handler={Handler} />
            <SetingsListItem text="block" icon={faCircleXmark} />
        </ul>
    )
}


function ConvItem({data, id, handler}) {
    const color = useContext(ColorContext).substring(6,13)

    return (
        <li className="w-full h-[50px] relative mt-3 flex justify-center items-center cursor-pointer" onClick={() => handler(null)}>
            <Link to="1" className="flex justify-start items-center w-[80%]">
                <div className="flex justify-start items-center w-full">
                    <div className="img relative w-[35px] h-[35px] mr-4">
                        <img src={data.img} className="w-[35px] h-[35px] rounded-[50%]" alt="img" />
                    </div>
                    <div className="content text-[11px] w-fit">
                        <h1 className="font-bold ">{data.name}</h1>
                        <p className="text-[8px] mt-1">
                            <FontAwesomeIcon className="mr-1 text-blue-400" icon={faCheckDouble} />
                            {data.conv[data.conv.length - 1]?.message}
                        </p>
                    </div>
                </div>
                <div className="date flex justify-end w-[70px] items-center relative mr-4">
                    {data.categorie === 'unread' &&  <div style={{background:color}} className="dot flex items-center justify-center w-[20px] h-[20px] text-[9px] font-bold rounded-full text-white">1</div>}
                    <p className="text-[8px] ml-4">{data.date}</p>
                </div>
            </Link>
            <div className="">
                <FontAwesomeIcon onClick={(e) => {
                    e.stopPropagation();
                    handler(data.id)
                }} className="text-[12px] w-3" icon={faEllipsisVertical} />
                {id === data.id && <SetingsList data={data}/>}
            </div>
        </li>
    )
}




export default function ConversationsList() {
    
    const [categorie, setCategorie] = useState('all')
    const theme = useContext(ThemeContext)
    const [visibleItem, setVisibleItem] = useState(null)
    const [data, dispatch] = useReducer(reducerHandler, iniConvs);

    function Handler(text) {
        setCategorie(text);
    }

    function ListVisibilityHandler(id) {
        id !== visibleItem ? setVisibleItem(id) : setVisibleItem(null);
    }

    return (
        <div className={`
            conversations 
            ${theme === 'light' ? "bg-lightItems text-lightText" : "bg-darkItems text-darkText"} 
            shadow-sm h-full rounded-sm p-1 flex-grow overflow-y-auto`
        }>
            <div>
                <div className="header w-full h-[50px] flex justify-between items-center text-[14px] px-4">
                    <h1 className="font-kaushan">conversations</h1>
                    <FontAwesomeIcon icon={faCommentDots} />
                </div>
                <Categories categorie={categorie} Handler={Handler} />

                <ConversationsProvider data={data} dispatch={dispatch}>
                    <ul className="mt-10">{
                        data?.map(c => (c.categorie === categorie || (categorie === 'all' && c.categorie !== 'archived')) 
                        && <ConvItem id={visibleItem} handler={ListVisibilityHandler}  key={c.id} data={c} />)
                    }</ul>
                </ConversationsProvider>
            </div>
        </div>
    )
}

const iniConvs = [
    {
        id:0,
        display: true, 
        name: 'aamhamdi unread', 
        img:'/aamhamdi1.jpeg', 
        date:'19:48',
        categorie: 'unread',
        conv : [
            {id:0, message : 'Lorem ipsum dolor sit amet', from: 'aamhamdi normal', seen:false, date:'19:23'},
            {id:1, message : 'dolor sit amet.', from: 'nmaazouz', seen:false, date:'19:24'},
            {id:2, message : 'Lorem ipsum dolor sit amet', from: 'aamhamdi normal', seen:false, date:'19:23'},
            {id:3, message : 'dolor sit amet.', from: 'nmaazouz', seen:false, date:'19:24'},
            {id:4, message : 'dolor sit amet.', from: 'nmaazouz', seen:false, date:'19:24'},
            {id:5, message : 'Lorem ipsum dolor sit amet', from: 'aamhamdi normal', seen:false, date:'19:23'},
        ]
    },
    {
        id:1,
        conv : [
            {id:0, message : 'Lorem ipsum dolor sit amet', from: 'aamhamdi normal', seen:false, date:'19:23'}
        ],
        display: true, 
        name: 'aamhamdi group', 
        img:'/aamhamdi1.jpeg', 
        date:'19:48', 
        categorie: 'groups',
    },
    {
        id:2,
        conv : [
            {id:0, message : 'Lorem ipsum dolor sit amet', from: 'aamhamdi normal', seen:false, date:'19:23'}
        ], 
        display: true, 
        name: 'aamhamdi', 
        img:'/aamhamdi1.jpeg', 
        date:'19:48', 
        categorie: 'user',
    },
    {
        id:3,
        conv : [
            {id:0, message : 'Lorem ipsum dolor sit amet', from: 'aamhamdi normal', seen:false, date:'19:23'},
        ], 
        display: true, 
        name: 'aamhamdi archived', 
        img:'/aamhamdi1.jpeg', 
        date:'19:48', 
        categorie: 'archived',
    },
]