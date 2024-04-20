import { useEffect, useRef, useState } from "react";
// import SenderMessageBox from "../../components/SenderMessageBox";
// import UserMessgeBox from "../../components/UserMessgeBox";
// import ChatUserList from "../../components/ChatUserList";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
// import { delete_Chat, get_All_Chat, get_Chat } from "../../actions/chatActions";
// import { getMessage, postMessage } from "../../actions/messageAction";
// import { CHAT_LIST_RESET, CHAT_RESET } from "../../types/chatConstants";
// import { MESSAGE_RESET } from "../../types/messageConstants";
import Lottie from "react-lottie";
import Dropdown from 'react-bootstrap/Dropdown';
import { BsThreeDots } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import EmojiPicker from 'emoji-picker-react';
import { Button, Form } from "react-bootstrap";
import { FaBell, FaSearch } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import './index.css'
import ChatUserList from "../../Components/ChatUserList";
import { LuListTodo } from "react-icons/lu";
import { MESSAGE_RESET } from "../../types/messageConstants";
import { getMessage, postMessage } from "../../action/messageAction";
import UserMessgeBox from "../../Components/UserMessgeBox";
import SenderMessageBox from "../../Components/SenderMessageBox";

export default function ChatScreen() {
    const match = useParams();
    const teamId=match.teamId;
    const channelId=match.channelId;
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiClick = (emoji) => {
        const emojiChar = emoji.emoji
        setSendMessage((prevMessage) => prevMessage + emojiChar);
    };


    const messagesEndRef = useRef(null);
    const [typeMessage, setTypeMessage] = useState(null);

    const [open, setOpen] = useState();
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    var { userData,loading } = userLogin;
    const teams = useSelector((state) => state.getTeam);
    var { team } = teams;
 
    
    var listData=team?.filter((item)=> item._id===teamId)[0]?.channels;

   
    const Message = useSelector((state) => state.getMessage);
    var { messageData } = Message;

    const [sendMessage, setSendMessage] = useState("");
  

    const [reload, setReload] = useState(false);
    const [searchUser, setSearchUser] = useState("");
    
    useEffect(()=>{
       dispatch({type:MESSAGE_RESET})
    },[])

    useEffect(()=>{
         listData = team?.filter((item) => item._id === teamId)[0]?.channels;
    },[team,teamId,channelId])

    useEffect(()=>{
         dispatch(getMessage(channelId))
    },[channelId])

   

    function handleSubmit(e) {
        e.preventDefault();
        if (sendMessage === "") {
            setTypeMessage("Type a message....");
            setTimeout(() => {
                setTypeMessage(null);
            }, 3000);
        }
        if (sendMessage !== "") {
           
            dispatch(postMessage(channelId,sendMessage,userData._id))
            setSendMessage("");
            setReload(!reload);
        
        }
    }

    function typingHandler(e) {
        setSendMessage(e.target.value);
    }

    return (
        <>
      
            {loading ? (
                <Loader />
            ) : (
                <div className="chatScreen d-flex">
                    <div className="" style={{ width: "50px", height: "100px" }}>
                        <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 mt-5">
                            <div>
                                <Link to="/main" className="fs-4 text-light"><FaHome /></Link>
                            </div>
                            <div className="mt-4">
                                    <Link to="/todo" className="fs-4 text-light"><LuListTodo /></Link>
                                    
                            </div>

                        </div>
                    </div>
                    <div className=" bootstrap snippets bootdey p-2 w-100">
                        <div className="tile tile-alt" id="messages-main">
                            <div className={open ? "ms-menu toggled" : "ms-menu"}>
                                <div className="ms-user clearfix text-white fs-2 d-flex justify-content-between ">
                                    {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="img-avatar pull-left" /> */}

                                    <div
                                        className="fs-3 text-light mb-2"
                                        style={{ fontFamily: "'Gluten', sans-serif" }}
                                    >
                                        Collabor8
                                    </div>
                                    <div className="ms-4">
                                        <FaBell className="text-light fs-3" />
                                    </div>

                                </div>

                                {/* <div className="p-15">
                        <div className="dropdown">
                            <a className="btn btn-primary btn-block" href="" data-toggle="dropdown">Messages <i className="caret m-l-5"></i></a>

                            <ul className="dropdown-menu dm-icon w-100">
                                <li><a href=""><i className="fa fa-envelope"></i> Messages</a></li>
                                <li><a href=""><i className="fa fa-users"></i> Contacts</a></li>
                                <li><a href=""><i className="fa fa-format-list-bulleted"> </i>Todo Lists</a></li>
                            </ul>
                        </div>
                    </div> */}

                                <div className="list-group lg-alt mt-1">
                                    <div className="d-flex flex-row justify-content-center w-100 mb-4 ">
                                        <div className="bg-light d-flex justify-content-center align-items-center" style={{ width: "40px", borderRadius: "10px 0 0 10px" }}>
                                            <FaSearch />
                                        </div>
                                        <Form style={{ display: "flex" }} >
                                            <Form.Control
                                                type="text"
                                                name="q"
                                                onChange={(e) => setSearchUser(e.target.value)}
                                                placeholder="Search Users..."
                                                className="mr-sm-2 ml-sm-5 serach-user"
                                                style={{ height: "50px", width: "300px", borderRadius: "0 10px 10px 0" }}
                                            ></Form.Control>
                                        </Form>
                                    </div>
                                    <span
                                        className="text-light fs-5 mb-2"
                                    // style={{ fontFamily: "'Gluten', sans-serif" ,textDecoration:"underline"}}
                                    >
                                        <span >Channels</span>
                                    </span>
                                    {searchUser === "" && listData &&
                                            listData.map((list) => {
                                            return (
                                                <ChatUserList
                                                    list={list}
                                                    userID={userData._id}
                                                    key={list._id}
                                                    channelId={channelId ? channelId :null}
                                                    teamId={teamId}
                                                />
                                            );
                                        })}
                                        {searchUser !== "" && listData && listData
                                        .filter((list) =>
                                            list?.name.includes((searchUser)
                                            )
                                        )
                                        .map((list) => (
                                            <ChatUserList
                                                list={list}
                                                userID={userData._id}
                                                key={list._id}
                                                channelId={channelId ? channelId : null}
                                                teamId={teamId}
                                            />
                                        ))}
                                    {/* {!listData && <span className="text-center fs-5 text-danger mb-2">No Chat !!</span>} */}
                                </div>
                            </div>

                            <div className="ms-body">
                                <div className="action-header clearfix">
                                    <div
                                        className="visible-xs"
                                        id="ms-menu-trigger"
                                        style={{ zIndex: 10 }}
                                        onClick={() => setOpen(!open)}
                                    >
                                        <i className="fa fa-bars text-light"></i>
                                    </div>
                                    <span
                                        className=" fs-2 text-light  d-flex flex-row justify-content-between align-items-center humgerber"
                                        style={{ fontFamily: "'Gluten', sans-serif", marginLeft: "-21px" }}
                                    >
                                        {/* <Link to="/"></Link> */}
                                        <div className="d-flex ">
                                            <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt="" style={{ width: "60px", height: "60px", borderRadius: "50%" }} className="img-avatar pull-left ms-4" />
                                            <div className="d-flex flex-column ms-4 pt-1 align-items-center justify-content-center" style={{ lineHeight: "26px" }}>
                                                {/* <div className="fs-2  text-light mt-2">{userData?.fullname}</div> */}
                                                {/* <div className="ms-4 text-dark" style={{ fontSize: "16px" }}>{userData?.username}</div> */}

                                            </div>
                                        </div>

                                    
                                    </span>
                                    <ul className="ah-actions actions">
                                        {/* <li>
                      <button onClick={handleDelete} style={{ width: "50px" }}>
                        <i className="fa fa-trash text-danger fs-5"></i>
                      </button>
                    </li> */}
                                        {/* <li>
                                        <a href="">
                                            <i className="fa fa-check"></i>
                                        </a>
                                    </li> */}
                                        {/* <li>
                                        <a href="">
                                            <i className="fa fa-clock-o"></i>
                                        </a>
                                    </li> */}
                                        {/* <li className="dropdown">
                                        <a href="" data-toggle="dropdown" aria-expanded="true">
                                            <i className="fa fa-sort"></i>
                                        </a>

                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li>
                                                <a href="">Latest</a>
                                            </li>
                                            <li>
                                                <a href="">Oldest</a>
                                            </li>
                                        </ul>
                                    </li> */}
                                        {/* { messageData && <li> <Dropdown style={{width:"42px",height:"30px"}} >
                        <style>{`
      .dropdown-toggle::after {
        display: none;
      }
    `}</style>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ width: "50px",height:"35px" }} >
                          <BsThreeDots className="text-light" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-danger">
                  <DeleteChat />

                        </Dropdown.Menu>
                      
                      </Dropdown>
                      </li>} */}
                                    </ul>
                                </div>
                                <div className="show-msg pt-3">
                                    {messageData &&
                                        messageData.map((msg) => {
                                            if (msg.sender._id === userData._id)
                                                return <UserMessgeBox msg={msg} key={msg._id} />;
                                            else return <SenderMessageBox msg={msg} key={msg._id} />;
                                        })}
                                    <div ref={messagesEndRef} />
                                </div>

                                
                                <div className="input-above">
                                    {typeMessage && (
                                        <span className="text-white ms-4">Type a Message.....</span>
                                    )}
                                    {showEmojiPicker && (
                                        <EmojiPicker onEmojiClick={(e) => handleEmojiClick(e)} width={"100%"} />
                                    )}
                                   
                                </div>
                                {(!(userData && channelId )) ? (
                                    <></>
                                ) : (
                                    <div className="card-footer">
                                        <div className="input-group ">

                                            <textarea
                                                name=""
                                                className="form-control type_msg text-dark chatInput"
                                                placeholder="Type A Message..."
                                                style={{ fontFamily: "'Gluten', sans-serif" }}
                                                onChange={(e) => typingHandler(e)}
                                                value={sendMessage}
                                            ></textarea>
                                            
                                            <div className="input-group-append d-flex">
                                                <span>
                                                   
                                                    <button style={{ width: "50px", zIndex: "0" }}
                                                        className="btn emoji"
                                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                                    >
                                                        😀
                                                    </button>

                                                </span>
                                                <span
                                                    className="input-group-text send_btn"
                                                    onClick={handleSubmit}
                                                >
                                                    <IoSend className="fs-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                               
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
