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
    // const sellerID = match.sellerID;
    // const chatID = match.chatID;
    const [open, setOpen] = useState();
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    var { userData,loading } = userLogin;
    const teams = useSelector((state) => state.getTeam);
    var { team } = teams;
 
    
    const listData=team?.filter((item)=> item._id===teamId)[0]?.channels;
    
    console.log(team);
    console.log(listData);
   
    // const getCHAT = useSelector((state) => state.getChat);
    // var { chatData, loading } = getCHAT;
    // const Message = useSelector((state) => state.getMessage);
    // var { messageData } = Message;

    const [sendMessage, setSendMessage] = useState("");
  

    const [reload, setReload] = useState(false);
    const [searchUser, setSearchUser] = useState("");

   
    // const [images, setImages] = useState([]);
    // const [uploading, setUploading] = useState(false);


    // console.log(images);



    // useEffect(() => {
    //     dispatch({ type: CHAT_RESET });
    //     dispatch({ type: MESSAGE_RESET });
    //     dispatch({ type: CHAT_LIST_RESET });
    // }, []);

    // useEffect(() => {
    //     if (userData && sellerID && userData._id === sellerID) {
    //         return;
    //     }
    //     if (!chatID && userData && sellerID) {
    //         dispatch(get_Chat(sellerID, userData.token));
    //     }
    // }, [sellerID, userData, chatID, reload]);

    // useEffect(() => {
    //     if (userData && sellerID && userData?._id === sellerID) {
    //         return;
    //     }
    //     if (userData && chatData && !chatID) {
    //         dispatch(getMessage(chatData._id, userData.token));
    //     }
    //     if (userData && chatID) {
    //         dispatch(getMessage(chatID, userData.token));
    //     }
    //     if (userData) {
    //         dispatch(get_All_Chat(userData._id, userData.token));
    //     }
    // }, [chatData, chatID, userData, reload, sellerID]);

    // useEffect(() => {
    //     if (localStorage.getItem("userData")) {
    //         userData = JSON.parse(localStorage.getItem("userData"));
    //     } else {
    //         navigate("/");
    //         return;
    //     }
    //     dispatch(get_All_Chat(userData._id, userData.token));
    //     if (userData._id === sellerID) {
    //         return;
    //     }

    //     setSendMessage("");
    // }, [dispatch, sellerID, userData, chatID, reload]);

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     if (sendMessage === "") {
    //         setTypeMessage("Type a message....");
    //         setTimeout(() => {
    //             setTypeMessage(null);
    //         }, 3000);
    //     }
    //     if (sendMessage !== "") {
    //         const formData = new FormData();
    //         formData.append("content", sendMessage);
    //         for (let i = 0; i < images.length; i++) {
    //             const file = images[i];
    //             formData.append("attachments", file);
    //         }
    //         if (chatID) {
    //             dispatch(postMessage(chatID, formData, userData.token));
    //         } else {
    //             dispatch(postMessage(chatData._id, formData, userData.token));
    //         }
    //         if (userData && chatData && !chatID) {
    //             dispatch(getMessage(chatData._id, userData.token));
    //         }
    //         if (userData && chatID) {
    //             dispatch(getMessage(chatID, userData.token));
    //         }
    //         setSendMessage("");
    //         setReload(!reload);
    //         setImages([]);
    //     }
    // }

    // useEffect(() => {
    //     if (messagesEndRef.current) {
    //         messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    //     }
    // }, [messageData]);


    // const uploadFileHandler = async (e) => {
    //     const data = e.target.files[0];
    //     if (!data) return;
    //     const imagesData = [...images];
    //     imagesData.push(data);

    //     setImages(imagesData);
    //     setUploading(false);
    // };

    // const removeImg = (fileToRemove) => {
    //     const updatedImages = images.filter((file) => file !== fileToRemove);
    //     setImages(updatedImages);
    // };

    // function typingHandler(e) {
    //     setSendMessage(e.target.value);
    //     if (!typing) {
    //         setTyping(true);

    //         // socket.emit("typing", selectedChat._id);
    //     }
    //     let lastTypingTime = new Date().getTime();
    //     var timerLength = 3000;
    //     setTimeout(() => {
    //         var timeNow = new Date().getTime();
    //         var timeDiff = timeNow - lastTypingTime;
    //         if (timeDiff >= timerLength && typing) {
    //             // socket.emit("stop typing", selectedChat._id);
    //             setTyping(false);
    //         }
    //     }, timerLength);
    // }

    return (
        <>
      
            {loading ? (
                <Loader />
            ) : (
                <div className="chatScreen d-flex">
                    <div className="" style={{ width: "50px", height: "100px" }}>
                        <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 mt-5">
                            <div>
                                <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt="" className="img-avatar box-img" />
                            </div>
                            <div>
                                <Link to="/" className="fs-4 text-light"><FaHome /></Link>

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
                                                />
                                            );
                                        })}
                                    {/* {searchUser !== "" && chatListData && chatListData
                                        .filter((list) =>
                                            list.participants.some(
                                                (participant) =>
                                                    participant.username && participant.username != userData.username && participant.username.includes(searchUser)
                                            )
                                        )
                                        .map((list) => (
                                            <ChatUserList
                                                list={list}
                                                userID={userData._id}
                                                key={list._id}
                                                chatID={chatID ? chatID : chatData ? chatData._id : ""}
                                                token={userData?.token}
                                            />
                                        ))} */}
                                    {/* {!chatListData && <span className="text-center fs-5 text-danger mb-2">No Chat !!</span>} */}
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
                                    {/* {messageData &&
                                        messageData.map((msg) => {
                                            if (msg.sender._id === userData._id)
                                                return <UserMessgeBox msg={msg} key={msg._id} />;
                                            else return <SenderMessageBox msg={msg} key={msg._id} />;
                                        })} */}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* {images && (
                                    <div className="position-relative input-above">
                                        {images.map((file, index) => (
                                            <div
                                                key={index}
                                                className="d-inline-block position-relative input-img"
                                            >
                                                <img
                                                    className="mt-2 "
                                                    src={URL.createObjectURL(file)}
                                                    style={{ height: "100px" }}
                                                    alt={`image${index + 1}`}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm position-absolute top-0 end-0 img-rem"
                                                    style={{ width: "30px", height: "40px", display: "none" }}
                                                    onClick={() => removeImg(file)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )} */}
                                <div className="input-above">
                                    {typeMessage && (
                                        <span className="text-white ms-4">Type a Message.....</span>
                                    )}
                                    {showEmojiPicker && (
                                        <EmojiPicker onEmojiClick={(e) => handleEmojiClick(e)} width={"100%"} />
                                    )}
                                   
                                </div>
                                {/* {((userData && sellerID && userData._id === sellerID) || (!sellerID && !chatID)) ? (
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
                                            <div className="input-group-append">
                                               
                                                {images.length < 4 && (
                                                    <>
                                                        <label
                                                            for="fileInput"
                                                            className="input-group-text attach_btn"
                                                        >
                                                            <i className="fas fa-paperclip"></i>
                                                        </label>
                                                        <input
                                                            type="file"
                                                            id="fileInput"
                                                            style={{ display: "none" }}
                                                            multiple
                                                            custom
                                                            onChange={uploadFileHandler}
                                                        />
                                                    </>
                                                )}
                                            </div>
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
                                )} */}
                               
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
