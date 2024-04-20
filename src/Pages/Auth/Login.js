import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../action/userAction';
import Message from '../../Components/Message';
import Loader from '../../Components/Loader';

export default function Login() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });
    const [vaild, setValid] = useState(null);
    const dispatch = useDispatch()
    var userLogin = useSelector((state) => state.userLogin)
    const { userData, loading, error } = userLogin

    useEffect(() => {
        if (userData) {
            navigate("/main")
        }
    }, [userData, error, userLogin])

    const handleLogin = async (e) => {
        e.preventDefault()
        setValid(true)
        if (userDetails.email === "" || userDetails.password === "") {
            setValid(false)
            return;
        }
        dispatch(login(userDetails.email, userDetails.password))

    }

  return (
      <section className="auth" >

          <div className="container h-100">
              <div className="row d-flex align-items-center justify-content-center h-100 w-100">
                  <div className="display-1 text-center" ><Link to="/">Collabor8</Link></div>

                  <div className="col-md-8 col-lg-7 col-xl-6 text-center">
                      <img src="https://www.scholarlms.com/wp-content/uploads/2020/10/Post-featured-Learners-Collaborate-Virtual-Learning-Environment.jpg"
                          className="img-fluid" alt="Phone image" />
                  </div>
                  <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 p-4 text-center" >
                      <h1 className="mb-1 text-light display-3" >Login</h1>
                      {error && <Message variant='danger'>{error}</Message>}
                      {vaild === false && <Message variant='danger'>Invalid Input</Message>}
                      {loading && <Loader />}
                      <form>

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

                          <div className="d-flex justify-content-around align-items-center mb-4">

                              {/* <a href="/forgotpassword" className="btn btn-danger">
                                  Forgot Password ?
                              </a> */}

                          </div>
                          <div className="form-check d-flex flex-row flex-wrap justify-content-center mb-4">

                              <div type="submit" className="button-4 mb-4 w-50 h-100 p-3"
                                  onClick={(e) => handleLogin(e)}
                              >
                                  Submit
                              </div>

                              <Link className="button-4 mb-4 w-50 h-100 p-3 text-light" to="/auth/signup">
                                  Signup
                              </Link>


                          </div>




                      </form>
                  </div>
              </div>
          </div>
      </section>
  )
}
