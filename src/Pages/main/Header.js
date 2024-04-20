import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'

import JoinTeamModel from '../../Components/JoinTeamModel'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../action/userAction';
import { useNavigate } from 'react-router-dom';


export default function Header() {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userData } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/auth/login")
    };

    return (
        <header>
            <Navbar
                className="Nav_Bar main-header"
                expand="lg"
                collapseOnSelec
            >
                <Container >
                    <LinkContainer to="/">
                        <Navbar.Brand className="text-light">
                            Collabor8
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
                        {/* {hide ? <></> : <SearchBox />} */}
                        <Nav className="ml-auto text-center d-flex align-items-center side">

                            <div className="btn text-white btn-circle btn-circle-sm m-1 " >
                                 <JoinTeamModel />
                            </div>
                            {/* <Link to="/wishlist" className="btn text-danger btn-circle btn-circle-sm m-1 style-btn-wishlist style-btn" >
                                <FaRegHeart /> My wishlist
                            </Link> */}
                            {/* {userData && userData.isAdmin && ( */}
                            {/* <NavDropdown title="Admin" id="adminmenu">
                                <LinkContainer to="/admin/userlist">
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/productlist">
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer> */}

                            {/* <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item> */}
                            {/* </NavDropdown> */}
                            {/* )} */}

                            {/* <LinkContainer to="/about">
                                <Nav.Link >
                                   
                                    About Us
                                </Nav.Link>
                            </LinkContainer> */}
                            {/* {userData ? (
                              <>
                                  <NavDropdown title={`${userData.fullname}`} id="username">
                                      <LinkContainer to={`/users/${userData._id}`}>
                                          <NavDropdown.Item>Profile</NavDropdown.Item>
                                      </LinkContainer>
                                      <LinkContainer to={`/chatScreen/`}>
                                          <NavDropdown.Item>Chat</NavDropdown.Item>
                                      </LinkContainer>
                                      <NavDropdown.Item onClick={logoutHandler}>
                                          Logout
                                      </NavDropdown.Item>
                                  </NavDropdown>
                              </>
                          ) : (
                              <LinkContainer to="/login">
                                  <Nav.Link>
                                      <i className="fas fa-user"></i> Sign In
                                  </Nav.Link>
                              </LinkContainer>
                          )} */}
                            <NavDropdown title={userData?.name} id="username">
                                <LinkContainer to={""}>
                                    <NavDropdown.Item >Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to={`/chatScreen/`}>
                                    <NavDropdown.Item>Chat</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
