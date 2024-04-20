import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from './Message';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdminPanelSettings } from 'react-icons/md';
import { addUser } from '../action/userAction';

export default function UserModel({list,team}) {
    const dispatch=useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const userLogin = useSelector((state) => state.userLogin);
    var { userData } = userLogin;
    const [listUser,setUser]=useState(list)
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);

    function handleAdd() {
        if (email==="") {
            setMessage("Enter valid Email")
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        } else {
            dispatch(addUser(team?._id,email))
            handleClose();
            // window.location.reload();
        }
    }
    return (
        <>
            <Button variant="warning" className="button-1 " onClick={handleShow}>
                Users
            </Button>

            <Modal show={show} className="text-danger " onHide={handleClose}>
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title className="text-danger">Users </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark'>
                    <div className='d-flex flex-column'>
                        {message && <Message variant="danger">{message}</Message>}
                        {userData && team && userData._id === team?.admin?._id &&  <input
                            placeholder="Add a user by email"
                            className="w-100 mt-3 mb-3 my-3 mb-3"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        ></input> }
                        <div className='mb-4 mt-2'></div>
                        {listUser && listUser.map((usr) =>
                            (usr._id === team?.admin?._id) ?
                                <div className='mb-4'> <Link to="" className='button-1'><MdAdminPanelSettings />{usr?.name}</Link></div>
                             :
                             <div className='mb-4'> <Link to="" className='button-6'>{usr?.name}</Link></div>
                             )}

                    </div>
                </Modal.Body>
                <Modal.Footer className='bg-dark'>
                    {/* <Button variant="warning">
                        Join Team
                    </Button> */}
                    {userData && team && userData._id === team?.admin?._id &&    <Button variant="primary" onClick={handleAdd}>
                        Add user
                    </Button> }
                </Modal.Footer>
            </Modal>
        </>
    )
}
