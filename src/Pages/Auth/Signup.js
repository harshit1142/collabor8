import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../action/userAction';
import Message from '../../Components/Message';
import Loader from '../../Components/Loader';

export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userRegister = useSelector((state) => state.userRegister);
    const {
        userData,
        loading: loadingRegister,
        error: errorRegister,
    } = userRegister;

    useEffect(() => {
        if (userData) {
            navigate("/login")
        }
    }, [userRegister]);

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        contact: "",
    });
    const [message, setMessage] = useState(null);

    const handleSignUp = (e) => {
        e.preventDefault();
        if (userDetails.password === "" || userDetails.email === "" || userDetails.contact === "" || userDetails.name === "" || userDetails.confirmPassword === "") {
            setMessage("Invalid Input !!");
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }else if(userDetails.password!== userDetails.confirmPassword) {
            setMessage("Password is not matching !!");
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
        else {
            dispatch(
                register(
                    userDetails.email,
                    userDetails.password,
                    userDetails.contact,
                    userDetails.name,
                    userDetails.confirmPassword
                )
            );
        }
    };
    
    return (
        <section className="auth" >

            <div className="container h-100">
                <div className="row d-flex align-items-center justify-content-center h-100 w-100">
                    <div className="display-1 text-center" > <Link to="/">Collabor8</Link> </div>

                    <div className="col-md-8 col-lg-7 col-xl-6 text-center">
                        <img src="https://www.scholarlms.com/wp-content/uploads/2020/10/Post-featured-Learners-Collaborate-Virtual-Learning-Environment.jpg"
                            className="img-fluid" alt="Phone image" />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 p-4 text-center" >
                        <h1 className="mb-1 text-light display-3" >Signup</h1>
                        {message && <Message variant='danger'>{message}</Message>}
                        {errorRegister && (
                            <Message variant="danger">{errorRegister}</Message>
                        )}
                        {loadingRegister && <Loader />}
                        <form>
                            <div className="form-outline mb-2">
                                <input
                                    type="text"
                                    id="form3Example1"
                                    className="form-control form-control"
                                    placeholder="Enter name"
                                    size="md"
                                  value={userDetails.name}
                                  onChange={(event) => {
                                      setUserDetails({
                                          ...userDetails,
                                          name: event.currentTarget.value,
                                      });
                                  }}
                                />
                            </div>

                            <div className="form-outline mb-2" >
                                <input type="email" id="form1Example13" className="form-control form-control-lg" placeholder="Enter Email"
                                  value={userDetails.email}
                                  onChange={(event) => {
                                      setUserDetails({
                                          ...userDetails,
                                          email: event.currentTarget.value,
                                      });
                                  }} 

                                />

                            </div>
                            <div className="form-outline mb-2">
                                <input
                                    id="form3Example3"
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter Contact"
                                    size="md"
                                  value={userDetails.contact}
                                  onChange={(event) => {
                                      setUserDetails({
                                          ...userDetails,
                                          contact: event.currentTarget.value,
                                      });
                                  }}
                                />
                            </div>


                            <div className="form-outline mb-2">
                                <input type="password" id="form1Example23" className="form-control form-control-lg" placeholder="Enter Password"
                                  value={userDetails.password}
                                  onChange={(event) => {
                                      setUserDetails({
                                          ...userDetails,
                                          password: event.currentTarget.value,
                                      });
                                  }} 

                                />

                            </div>
                            <div className="form-outline mb-2">
                                <input
                                    type="password"
                                    id="form3Example4"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    size="md"
                                    value={userDetails.confirmPassword}
                                    onChange={(event) => {
                                        setUserDetails({
                                            ...userDetails,
                                            confirmPassword: event.currentTarget.value,
                                        });
                                    }}
                                />
                            </div>

                            <div className="d-flex justify-content-around align-items-center mb-4">

                            </div>
                            <div className="form-check d-flex flex-row flex-wrap justify-content-center mb-4">

                                <div type="submit" className="button-4 mb-4 w-50 h-100 p-3"
                                      onClick={(e) => handleSignUp(e)}
                                >
                                    Submit
                                </div>

                                <Link className="button-4 mb-4 w-50 h-100 p-3 text-light" to="/auth/login">
                                    Login
                                </Link>


                            </div>




                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
