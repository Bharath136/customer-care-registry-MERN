import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';
import User from '../User/index.js';
import Agent from '../Agent/index.js';
import Admin from '../Admin/index.js';

const Header = () => {
    const [head, setHead] = useState('');
    const token = Cookies.getItem("jwtToken");
    const adminToken = localStorage.getItem("adminJwtToken");
    const agentToken = localStorage.getItem('agentToken')

    useEffect(() => {
        if (adminToken) {
            setHead('Admin');
        } else if (agentToken) {
            setHead('Agent');
        }
    }, [adminToken, agentToken]);

    const navigate = useNavigate();

    const onDeleteNotifications = () => {
        console.log("Deleted")
    }

    const onLogout = () => {
        Cookies.removeItem('adminJwtToken');
        const res = window.confirm("Are you sure you want to log out?");
        if (res) {
            localStorage.clear();
            Cookies.removeItem('jwtToken');
            navigate('/login');
        }
    };

    const renderHeader = () => {
        switch (head) {
            case 'Agent':
                return <Agent notification={[]} avatar="" onDeleteNotifications={() => {}} onLogout={onLogout} />;
            case 'Admin':
                return <Admin avatar="" onLogout={onLogout} />;
            default:
                return <User notification={[]} avatar="" onDeleteNotifications={() => {}} onLogout={onLogout} />;
        }
    }

    return (
        <header>
            {renderHeader()}
        </header>
    );
};

export default Header;
