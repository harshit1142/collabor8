import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import { TOAST_RESET } from '../types/userConstants';
import { useDispatch, useSelector } from 'react-redux';

function Alert() {
    const [show, setShow] = useState(true);
    const toastMessage = useSelector(state => state.toastMessage);
    const [isVisible, setIsVisible] = useState(false);
    const dispatch=useDispatch();

    useEffect(() => {
        // Set visibility to true when a new toast message is received
        if (toastMessage) {
            setIsVisible(true);

            // Automatically hide the toast after some time (e.g., 3 seconds)
            const timeout = setTimeout(() => {
                setIsVisible(false);
                dispatch({
                    type: TOAST_RESET
                });
            }, 3000);

            // Cleanup function to clear the timeout
            return () => clearTimeout(timeout);
        }
    }, [toastMessage]);

    if(!isVisible)
    return <></>

    return (
        <div style={{position:"absolute",bottom:"0px",right:"0",zIndex:"9999",padding:"0"}}>
            <div >

                <Toast onClose={() => setShow(false)} show={show}  bg="" className='bg-warning alert' style={{ width: "260px" }}>
                    <Toast.Header className='bg-warning text-dark'>
                        <strong className="me-auto">Notification</strong>
                    </Toast.Header>
                    <Toast.Body className='bg-light text-dark'>{toastMessage?.message}</Toast.Body>
                </Toast>
            </div>
        </div>
    );
}

export default Alert;