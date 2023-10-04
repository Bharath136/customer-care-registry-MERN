import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {MdNotifications} from 'react-icons/md'

const Agent = ({ notification, avatar, onDeleteNotifications, onLogout }) => {


    const agentToken = localStorage.getItem('agentToken')

    return (
        <Navbar fixed="top" style={{ padding: '0 20px', minHeight: '10vh', width: '100%' }} expand="lg" bg="light" variant="light">
            <Navbar.Brand><Link to='/admin/dashboard' style={{ textDecoration: 'none' }}>Gifts</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />
            <Navbar.Collapse id="navbarSupportedContent">
                <Nav className="mr-auto">
                    <NavLink to="/agent/dashboard" className="nav-link">Home</NavLink>
                    <NavLink to="/agent/all-products" className="nav-link"><MdNotifications/></NavLink>

                    {!agentToken ? (
                        <NavLink as={NavLink} to="/login" className="nav-link">
                            Login/SignUp
                        </NavLink>
                    ) : (
                        <NavLink className="nav-link" to="/login" onClick={onLogout}>
                            Logout
                        </NavLink>
                    )}
                    <NavDropdown title="Dropdown" id="navbarDropdown">
                        <NavDropdown.Item href="#">Action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Agent;
