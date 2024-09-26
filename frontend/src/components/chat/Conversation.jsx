
import {useContext, useState, useRef, useEffect} from 'react'
import {ThemeContext} from '../../Contexts/ThemeContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from 'react-router-dom';
import { 
    faArrowLeft, 
    faCheckDouble, 
    faEllipsisVertical, 
    faFaceSmile, 
    faKeyboard, 
    faPaperPlane, 
    faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import Emojies from './Emojies';
import {flushSync} from 'react-dom'

import axios from 'axios';
import AuthContext from '../../Contexts/AuthContext';

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        const response = await axios.post('http://localhost:8000/auth/refresh/', {
            refresh: refreshToken,
        });
        const { access } = response.data;
        localStorage.setItem('accessToken', access);
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw new Error('Unable to refresh token');
    }
};

const fetchMessages = async (chatId, retry = true) => {
    const token = localStorage.getItem('accessToken');
    try {
        const response = await axios.get(`http://localhost:8000/chat/${chatId}/messages/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        if (error.response && error.response.status === 401 && retry) {
            // Token expired, try to refresh it
            try {
                await refreshAccessToken();
                return fetchMessages(chatId, false); // Retry fetching messages
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                throw new Error('Session expired. Please log in again.');
            }
        } else {
            throw new Error('Failed to fetch messages');
        }
    }
};
function UserMessage({m}) {
    return (
        <li className="mt-4 flex p-1 items-center justify-start">
            <img src="/aamhamdi1.jpeg" className="w-[30px] shadow-sm rounded-full mr-4" alt="" />
            <div className="bg-[#2F4858] text-white min-w-10 max-w-[50%] flex-wrap p-2 pr-4 rounded  ">
                <h1 style={{wordWrap: 'break-word'}} className="text-[12px] font-noto w-full">{m.message}</h1>
                <div className="flex mt-1 items-center">
                    <FontAwesomeIcon className="text-[7px]" icon={faCheckDouble} />
                    <p className="text-[7px] ml-1">{m.date}</p>
                </div>
            </div>
        </li>
    )
}

function FromMessage({m}) {
    return (
        <li className="mt-4 flex p-1 items-center justify-end">
            <div className="bg-[#2F4858] text-white min-w-10 p-2 rounded text-right max-w-[50%] flex-wrap">
                <h1 className="text-[12px] font-noto">{m.message}</h1>
                <p className="text-[7px] mt-1">{m.date}</p>
            </div>
            <img src="/aamhamdi1.jpeg" className="w-[30px] shadow-sm rounded-full ml-4" alt="" />
        </li>
    )
}

export default function Conversation() {

    const { id: chatId } = useParams();
    const theme = useContext(ThemeContext)
    const [showEmoji, setShowEmoji] = useState(false)
    const [text, setText] = useState('');
    const cnv = useRef(null)
    const {user} = useParams()
    const tokens = useContext(AuthContext)

    const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     const fetchMessages = async () => {
    //         try {
    //             // console.log(`${chatId}`)
    //             const response = await axios.get(`/chat/1/messages/`, {  // Use backticks here
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('accessToken')}`  // Use backticks and proper string format for token
    //                 }
    //             });
    //             setMessages(response.data.data);
    //         } catch (error) {
    //             console.error('Error fetching messages:', error);
    //         }
    //     };

    //     fetchMessages();
    // }, [chatId]);

    // if (messages) {
    //     console.log(messages);
    // }


    return (
        <div className={`
                conversations 
                ${theme === 'light' ? "bg-lightItems text-lightText" : "bg-darkItems text-darkText"} 
                shadow-sm h-[500px] rounded-sm flex justify-center p-1 flex-grow`
            }>
            <div className="relative h-full w-full">
                <div className="header  w-full px-10 h-[60px] flex justify-between items-center mt-2">
                    <div className="avatar w-[95%] h-full flex justify-start items-center">
                        <Link className="w-3 h-3 p-2 flex items-center justify-center cursor-pointer" to="/dashboard/chat">
                            <FontAwesomeIcon className="text-[14px] " icon={faArrowLeft} />
                        </Link>
                        <img src={data.img} className="w-[35px] h-[35px] rounded-full mx-4" alt="" />
                        <div className="infos text-[12px]">
                            <h1 className="font-bold">{data.name}</h1>
                            <p className="text-[8px]">last seen {data.date}</p>
                        </div>
                    </div>
                    <FontAwesomeIcon className="text-[12px]" icon={faEllipsisVertical} />
                </div>
                <div className="body relative flex justify-center">
                    {/* {messages.length ? 
                        <ul ref={cnv} className="mt-10 px-2 max-w-[600px] w-full overflow-auto" style={{height:'calc(70vh - 42px)'}}>
                        {messages.map(m => {
                            if (m.from === data.name)
                                return <UserMessage key={m.id} m={m} />
                            return <FromMessage key={m.id} m={m} />
                        })} 
                        </ul>
                    : */}
                    <h1 className="text-center mt-[50px] ml-[50px] translate-x-[-50%] text-[10px] absolute">no messages yet</h1> 
                    {/* } */}
                </div>
                <div className="actions mt-2 absolute w-full h-[40px] bottom-2 flex justify-center">
                    <div className=' w-full max-w-[600px] relative' >
                        {showEmoji && <Emojies TextInputHandler={setText} inputText={text} />}
                        <div className="input rounded-sm p-1 px-4 text-[16px] h-full flex items-center justify-between bg-[#2F4858]/90 text-white">
                            <FontAwesomeIcon className="cursor-pointer" icon={!showEmoji ? faFaceSmile : faKeyboard} onClick={() => setShowEmoji(!showEmoji)} />
                            <input style={{wordWrap: 'break-word'}} onKeyUp={(e) => {
                                if (e.key == 'Enter')
                                    ;//sendMessage()
                            }} value={text}  type="text"  placeholder="message..." onChange={(e) => setText(e.target.value)} className="w-[80%] bg-transparent text-[12px] focus:outline-none" />
                            <FontAwesomeIcon className="cursor-pointer" icon={faPaperclip} />
                            <FontAwesomeIcon className="cursor-pointer" icon={faPaperPlane}  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// function sendMessage() {
//     flushSync(() => {
//         setMessages([...messages , {id:nextId++, message: text, from:data.name, date:'12:33', seen : false}])
//     })
//     setText('');
//     setShowEmoji(false);
//     cnv.current.scroll({top: cnv.current.scrollHeight, behavior: 'smooth'});
// }


// useEffect(() => {
//     // console.log(cnv)
//     if (cnv.current) { // Check if cnv.current is not null
//         cnv.current.scroll({ top: cnv.current.scrollHeight, behavior: 'auto' });
//     }
// }, [messages])

const data = {
    id:0,
    display: true, 
    name: 'aamhamdi normal', 
    img:'/aamhamdi1.jpeg', 
    message:'hello', 
    date:'19:48', 
    type:'user', 
    seen:false, 
    archived:false,
    conv : []
}

// let nextId
// if (data.conv && data.conv.length > 0) {
    //     nextId = data.conv.length;
    // } else {
        //     nextId = 0;
        // }
        
// {id:0, message : 'Lorem ipsum dolor sit amet', from: 'aamhamdi normal', seen:false, date:'19:23'},
// {id:1, message : 'dolor sit amet.', from: 'nmaazouz', seen:false, date:'19:24'},
// {id:2, message : 'Lorem ipsum dolor sit amet', from: 'aamhamdi normal', seen:false, date:'19:23'},
// {id:3, message : 'dolor sit amet.', from: 'nmaazouz', seen:false, date:'19:24'},
// {id:4, message : 'dolor sit amet.', from: 'nmaazouz', seen:false, date:'19:24'},
// {id:5, message : 'Lorem ipsum dolor sit amet', from: 'aamhamdi normal', seen:false, date:'19:23'},
// {id:6, message : 'Lorem ipsum dolor sit amet', from: 'nmaazouz normal', seen:false, date:'19:23'},
// {id:7, message : 'Lorem ipsum dolor sit amet', from: 'aamhamdi normal', seen:false, date:'19:23'},
// {id:8, message : 'Lorem ipsum dolor sit amet', from: 'nmaazouz normal', seen:false, date:'19:23'},
// {id:9, message : 'Lorem ipsum dolor sit amet', from: 'aamhamdi normal', seen:false, date:'19:23'},
// {id:10, message : 'Lorem ipsum dolor sit amet', from: 'nmaazouz normal', seen:false, date:'19:23'},
// {id:11, message : '😁😁😁😁😁', from: 'aamhamdi normal', seen:false, date:'19:23'},