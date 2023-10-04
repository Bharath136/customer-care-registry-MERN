import 'bootstrap/dist/css/bootstrap.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const Admin = ({ avatar, onLogout }) => {


    const adminToken = localStorage.getItem('jwtToken')
    return (
        <Navbar fixed="top" style={{ padding: '0 20px', minHeight: '10vh', width: '100%' }} expand="lg" bg="light" variant="light">
            <Navbar.Brand><Link to='/admin/dashboard' style={{ textDecoration: 'none' }}>Gifts</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />
            <Navbar.Collapse id="navbarSupportedContent">
                <Nav className="mr-auto">
                    <NavLink to="/admin/dashboard" className="nav-link">Home</NavLink>
                    <NavLink to="/admin/complaints" className="nav-link">Complaints</NavLink>
                    <NavLink to="/admin/customers" className="nav-link">Customers</NavLink>
                    <NavLink to="/admin/agents" className="nav-link">Agents</NavLink>

                    {adminToken ? (
                        <NavLink as={NavLink} to="/login" className="nav-link">
                            Login/SignUp
                        </NavLink>
                    ) : (
                        <NavLink className="nav-link" to="/login" onClick={onLogout}>
                            Logout
                        </NavLink>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Admin;
