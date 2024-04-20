import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { IoIosAddCircle } from 'react-icons/io';

export default function JoinTeamModel() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                  {/* {message && <Message variant="danger">{message}</Message>} */}
                  <input
                      placeholder="Team Code"
                      className="w-100 mt-3 mb-3"
                    //   value={val.oldPassword}
                    //   onChange={(e) => setVal({ ...val, oldPassword: e.target.value })}
                  ></input>
                  {/* <input
                      placeholder="new Password"
                      className="w-100 mt-3 mb-3"
                      value={val.newPassword}
                      onChange={(e) => setVal({ ...val, newPassword: e.target.value })}
                  ></input> */}
                  {/* <input
                      placeholder="confirm Password"
                      className="w-100 mt-3 mb-3"
                      value={val.confirmPassword}
                      onChange={(e) =>
                          setVal({ ...val, confirmPassword: e.target.value })
                      }
                  ></input> */}
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="warning">
                      Join Team
                  </Button>
                  <Button variant="primary" >
                      Create New Team
                  </Button>
              </Modal.Footer>
          </Modal>
      </>
  )
}
