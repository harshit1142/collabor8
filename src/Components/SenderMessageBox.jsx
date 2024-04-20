import React, { useState } from 'react'
import OpenImage from './OpenImage';

export default function SenderMessageBox({msg}) {
    const date = new Date(msg.createdAt)

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = ` ${hours}:${minutes} | ${day}-${month}-${year}`;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [url, setUrl] = useState("")
    // function handleOpen(val) {
    //     setUrl(val);
    //     handleShow();
    // }
  return (
      <div className="message-feed media left">
          <div className="pull-left">
          </div>
          {/* {msg?.attachments.length > 0 && <div className='content-image mf-content receive_img content-image-send'>
              {msg.attachments  && msg.attachments.map((ele, ind) => {
                  return <img src={ele.url} alt={ind} onClick={() => handleOpen(ele.url)} style={{ cursor: "pointer" }} />
              })}
          </div>} */}
          <OpenImage handleClose={handleClose} show={show} url={url} msg={msg?.content} />
          <div className="media-body  mt-1">
              <div className="mf-content msg-container" style={{ fontFamily: "'Gluten', sans-serif" }}>
                  {msg?.content}
              <small className="mf-date msg_time"><i className="fa fa-clock-o "></i> {formattedDate}</small>
              </div>
          </div>
             <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt="" className="img-avatar box-send-img" />
          
      </div>
  )
}
