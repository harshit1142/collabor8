import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from './Message';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel, getAllTeam } from '../action/userAction';

export default function ChannelModel({list,team}) {
    const dispatch=useDispatch();
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const userLogin = useSelector((state) => state.userLogin);
    var { userData } = userLogin;

    const [channel,setChannel]=useState(list);

    const [name,setName]=useState("");
    const [message, setMessage] = useState(null);



    function handleAdd()
    {
        if(name===""){
           setMessage("Enter valid Name")
           setTimeout(()=>{
            setMessage(null)
           },3000)
        }else{
            dispatch(addChannel(team._id,name))

            handleClose()
            
        }
    }



    return (
        <>
            <Button variant="warning" className="button-2 "style={{marginRight:"10px"}} onClick={handleShow}>
                Channels
            </Button>

            <Modal show={show} className="text-danger " onHide={handleClose}>
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title className="text-danger">Channels</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark'>
                 <div className='d-flex flex-column'>
                        {message && <Message variant="danger">{message}</Message>}
                        {userData && team && userData._id === team?.admin?._id && <input
                            placeholder="Enter a new channel name"
                            className="w-100 mt-3 mb-3 my-3 mb-3"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></input>}
                        <div className='mb-4 mt-2'></div> 
                        {channel && channel.map((ch) =>  <div className='mb-4'> <Link to={`/channel/${team._id}/${ch._id}`} className='button-6'>{ch?.name}</Link></div>                        
                        )}
                 </div>
                </Modal.Body>
                <Modal.Footer className='bg-dark'>
                    {/* <Button variant="warning">
                        Join Team
                    </Button> */}
                  {userData && team && userData._id ===team?.admin?._id &&  <Button variant="primary" onClick={handleAdd}>
                        Create A New Channel
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
  )
}
