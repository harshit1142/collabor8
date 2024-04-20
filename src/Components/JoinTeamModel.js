import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { IoIosAddCircle } from 'react-icons/io';
import Message from './Message';
import { useDispatch, useSelector } from 'react-redux';
import { addTeam, getAllTeam, joinTeam } from '../action/userAction';

export default function JoinTeamModel() {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const userLogin = useSelector((state) => state.userLogin);
    const { userData } = userLogin;

    const [join, setJoin] = useState("");
    const [joinNew, setJoinNew] = useState("");

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);

    function handleJoin() {
        if (join === "") {
            setMessage("Enter Valid Code")
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        } else {
            dispatch(joinTeam(userData._id, join))
            handleClose();   
          
        }
    }
    function handleNew() {
        if (joinNew === "") {
            setMessage("Enter valid Name")
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        }else if(joinNew.length <5){
            setMessage("Team Name should be atleast more than 5 words")
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        }
         else {
            dispatch(addTeam(userData._id, joinNew))
            handleClose()
        }
    }
    return (
        <>
            <Button variant="warning" className="mt-2 mb-2 ms-2" onClick={handleShow}>
                <IoIosAddCircle /> Join or Create Team
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="bg-secondary">
                    <Modal.Title className="text-white">Join or Create Team</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message && <Message variant="danger">{message}</Message>}
                    <input
                        placeholder="Team Code To Join"
                        className="w-100 mt-3 mb-3"
                        value={join}
                        onChange={(e) => setJoin(e.target.value)}
                    ></input>
                    <hr></hr>
                    <p>Or</p>

                    <input
                        placeholder="Create New Team Name"
                        className="w-100 mt-3 mb-3"
                        value={joinNew}
                        onChange={(e) => setJoinNew(e.target.value)}
                    ></input>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleJoin}>
                        Join Team
                    </Button>
                    <Button variant="primary" onClick={handleNew}>
                        Create New Team
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
