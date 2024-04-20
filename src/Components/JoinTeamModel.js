import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { IoIosAddCircle } from 'react-icons/io';
import Message from './Message';

export default function JoinTeamModel() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [join,setJoin]=useState("");
    const [joinNew,setJoinNew]=useState("");

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);

    function handleJoin() {
        if (join === "") {
            setMessage("Enter Valid Code")
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        } else {

        }
    }
    function handleNew() {
        if (joinNew === "") {
            setMessage("Enter valid Name")
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        } else {

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
