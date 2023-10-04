import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import {MdNotifications} from 'react-icons/md'

const User = ({ notification, avatar, onDeleteNotifications, onLogout }) => {

    const token = Cookies.get('jwtToken')

    return(
    <Navbar fixed="top" style={{ padding: '0 20px', minHeight: '10vh', width: '100%' }} expand="lg" bg="light" variant="light">
        <Navbar.Brand><Link to='/' style={{ textDecoration: 'none' }}>Care</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="mr-auto">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/agents" className="nav-link"><MdNotifications style={{height:'25px', width:'25px'}}/></NavLink>
                <NavLink to="/agents" className="nav-link">ChatWithAgent</NavLink>
                <NavLink to="/my-complaints" className="nav-link">MyComplaints</NavLink>

                {!token ? (
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
)};

export default User;
