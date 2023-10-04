import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AgentProtectedRoute = (props) => {
    const { Component } = props
    const navigate = useNavigate()
    const agentToken = localStorage.getItem('agentToken')
    console.log(agentToken)
    useEffect(() => {
        if (!agentToken) {
            navigate('/login')
        }
    })
    return <Component />
};

export default AgentProtectedRoute;
