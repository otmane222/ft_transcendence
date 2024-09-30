
import {useContext, useState, useRef, useEffect} from 'react'
import {ThemeContext} from '../../Contexts/ThemeContext'
import {AuthContext} from '../../Contexts/AuthContext'
import {TokenContext} from '../../Contexts/TokenContext';

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

const refreshAccessToken = async () => {
    console.log("refreshing")
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


function UserMessage({m}) {
    return (
        <li className="mt-4 flex p-1 items-center justify-start ">
            <img src="/aamhamdi1.jpeg" className="w-[30px] shadow-sm rounded-full mr-4" alt="" />
            <div className="bg-[#2F4858] text-white min-w-10 max-w-[50%] flex-wrap p-2 pr-4 rounded  ">
                <h1 style={{wordWrap: 'break-word'}} className="text-[12px] font-noto w-full">{m.content}</h1>
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
                <h1 className="text-[12px] font-noto">{m.content}</h1>
                <p className="text-[7px] mt-1">{m.date}</p>
            </div>
            <img src="/aamhamdi1.jpeg" className="w-[30px] shadow-sm rounded-full ml-4" alt="" />
        </li>
    )
}


const getUserByUsername = async (username, token, retry = true) => { 
    try {
        const response = await axios.get(
            `http://localhost:8000/auth/user/${username}/`, // Your API endpoint
            {
                headers: {
                    Authorization: `Bearer ${token}` // Pass the user's token for authentication
                }
            }
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401 && retry) {
            try {
                await refreshAccessToken();
                getUserByUsername(username, token, false); // Retry fetching data once, passing retry as false
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
            }
        } else {
            console.error('Error fetching user:', error);
            // setError('Failed to fetch data');
            return null;
        }
    }
};

const formatDate = (dateString) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };
    
    return new Date(dateString).toLocaleString(undefined, options);
};

export default function Conversation() {
    // console.log("called once and ..")
    // const { id: chatId } = useParams();
    const theme = useContext(ThemeContext)
    const [showEmoji, setShowEmoji] = useState(false)
    const [text, setText] = useState('');
    const cnv = useRef(null)
    const {user} = useParams()
    const {userme} = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const { token } = useContext(TokenContext);
    
    const [friend, setFriend] = useState(null);
    
    // const token = localStorage.getItem('accessToken')
    
    useEffect(() => {
        const fetchFriend = async () => {
            const userData = await getUserByUsername(user, token, true);
            setFriend(userData);
        };
        fetchFriend();
    }, [user, token]);
    
    const [chat, setChat] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        const createOrFetchChat = async (retry = true) => {
            // console.log("creating chatId: " , user)
            try {
                const response = await axios.post("http://localhost:8000/chat/",
                {participants: user}, // This is the friend's username or ID
                {headers: {
                    Authorization: `Bearer ${token}` // Pass the user's token for authentication
                }},
                );
                setChat(response.data); // Set the chat data if successful
            }
            catch (error) {
                if (error.response && error.response.status === 401 && retry) {
                    try {
                        await refreshAccessToken();
                        createOrFetchChat(false); // Retry fetching data once, passing retry as false
                    } catch (refreshError) {
                        console.error('Error refreshing token:', refreshError);
                    }
                } else {
                    console.error('Error fetching user:', error);
                }
            }
        };
        const delayDebounceFn = setTimeout(() => {
            createOrFetchChat();
        }, 10); 
        return () => clearTimeout(delayDebounceFn)
    }, [user, token]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Make the API request to fetch messages for the specific chat
                const response = await axios.get(`http://localhost:8000/chat/${chat?.id}/messages/`,
                    { headers: {Authorization: `Bearer ${token}`}}
                );
                setMessages(response.data); // Store the messages in state
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch messages");
                setLoading(false);
            }
        };

        if (chat?.id) {
            fetchMessages(); // Fetch messages when chatId is available
        }
    }, [chat, token]); // Re-run this effect when chatId changes
    // if (messages)
    // {
    //     console.log(messages)
    // }

    // const sendMessage = async () => {
    //     if (text.trim() === '') return; // Prevent empty messages

    //     try {
    //         const response = await axios.post(`http://localhost:8000/chat/${chat.id}/messages/`,
    //             {
    //                 chat_id: chat?.id, // Assuming you have the current user's ID
    //                 receiver: friend?.id, // The ID of the other participant in the chat
    //                 content: text,
    //             }
    //             , {
    //                 headers: {
    //                     Authorization: `Bearer ${token}` // Send token if needed
    //                 }
    //             }
    //         );

    //         // Clear the input field after message is sent
    //         setText('');

    //         // Optionally, update the local message list with the new message
    //         console.log('Message sent:', response.data);
    //     } catch (error) {
    //         console.error('Error sending message:', error);
    //     }
    // };

    const [socket, setSocket] = useState(null);
    useEffect(() => {
        // Open WebSocket connection when the component mounts
        const ws = new WebSocket(`ws://localhost:8000/ws/chat/${chat?.id}/`);
        setSocket(ws);

        // Handle incoming messages
        ws.onmessage = (event) => {
            const datas = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, datas]);
        };

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            ws.close();
        };
    }, [chat]);

    const sendMessage = () => {
        if (socket && text.trim() !== '') {
            // Send a message through the WebSocket
            socket.send(JSON.stringify({
                'message': text,
                'sender': userme.id, // Your current user's ID
            }));
            setText(''); // Clear the input field
        }
    };

    const formattedDate = formatDate(friend?.last_login);
    return (
        <div className={`
                conversations 
                ${theme === 'light' ? "bg-lightItems text-lightText" : "bg-darkItems text-darkText"} 
                shadow-sm h-[730px] rounded-sm flex justify-center p-1 flex-grow`
            }>
            <div className="relative h-[720px] w-full">
                <div className="header   w-full px-10 h-[60px] flex justify-between items-center mt-2">
                    <div className="avatar w-[95%] h-full flex justify-start items-center">
                        <Link className="w-3 h-3 p-2 flex items-center justify-center cursor-pointer" to="/dashboard/chat">
                            <FontAwesomeIcon className="text-[14px] " icon={faArrowLeft} />
                        </Link>
                        <img 
                        src={
                        friend?.profile_image || 'http://localhost:8000/media/filo/default_profile_image.jpeg'}
                        alt="FriendProfile"
                        className="w-[35px] h-[35px] rounded-full mx-4"/>
                        <div className="infos text-[12px]">
                            <h1 className="font-bold">{friend?.username}</h1>
                            <p className="text-[8px]">last seen {formattedDate}</p>
                        </div>
                    </div>
                    <FontAwesomeIcon className="text-[12px]" icon={faEllipsisVertical} />
                </div>
                <div className="body relative flex justify-center">
                    {messages.length ? 
                        <ul ref={cnv} className="mt-10 px-2 max-w-[600px] w-full overflow-auto" style={{height:'calc(600px - 42px)'}}>
                        {messages.map(m => {
                            if (m.sender === userme?.username)
                                return <UserMessage key={m.id} m={m} />
                            return <FromMessage key={m.id} m={m} />
                        })} 
                        </ul>
                    :
                    <h1 className="text-center mt-[50px] ml-[50px] translate-x-[-50%] text-[10px] absolute">no messages yet</h1> 
                    }
                </div>
                <div className="actions mt-2 absolute w-full h-[40px] bottom-2 flex justify-center">
                    <div className=' w-full max-w-[600px] relative' >
                        {showEmoji && <Emojies TextInputHandler={setText} inputText={text} />}
                        <div className="input rounded-sm p-1 px-4 text-[16px] h-full flex items-center justify-between bg-[#2F4858]/90 text-white">
                            <FontAwesomeIcon className="cursor-pointer" icon={!showEmoji ? faFaceSmile : faKeyboard} onClick={() => setShowEmoji(!showEmoji)} />
                            <input style={{wordWrap: 'break-word'}} onKeyUp={(e) => {
                                if (e.key == 'Enter')
                                    sendMessage()
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

