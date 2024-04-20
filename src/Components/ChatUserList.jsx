import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


export default function ChatUserList({ list, teamId, channelId }) {
    const dispatch=useDispatch();
    const navigate=useNavigate();

   
    // console.log(list);

    // const filteredParticipants = list.participants.filter(participant => participant._id !== userID);

    const active = (channelId ===list._id);


    const lastMsg = list?.lastMessage?.content.length > 20 ? list?.lastMessage?.content.substring(0, 20)+"...." : list?.lastMessage?.content;
    const date = new Date(list?.lastMessage?.createdAt)

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    var formattedDate = ` ${hours}:${minutes}`;
    if(isNaN(hours)){
     formattedDate="";
    }

   
    return (
        <div className={active ? "list-menu active  media" : "list-menu "} >
        <Link to={`/channel/${teamId}/${list?._id}`} className={active ?"list-group-item active  media":"list-group-item  media "}>
        <div className='d-flex flex-row'>
            <div className="pull-left ">
                <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt="" className="img-avatar userlist-img" />
            </div>
            <div className="media-body ms-3 w-100">
                <div className="list-group-item-heading">
                   {list.name}
                
                </div>
                        <small className="list-group-item-text c-gray text-">{lastMsg}</small>
                <div className='d-flex justify-content-end'>{formattedDate}</div>
            </div>

        </div>
        </Link>
     
         
        </div>
    )
}
