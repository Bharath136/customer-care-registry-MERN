import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './index.css'; // Import your custom CSS file for styling
import { Link } from 'react-router-dom';

const Agents = () => {
  // Initialize state using destructuring
  const [notifications, setNotifications] = useState([]);
  const userId = Cookies.get('userId');

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    // Create an async function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5100/agent-notifications/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error, e.g., show an error message to the user
      }
    };

    // Call the fetchData function
    fetchData();
  }, [userId]); // Include userId in the dependency array

  return (
    <div className="agents-container">
      <h2 className="agents-heading">Agents Messages</h2>
      <ul className="list-group">
        {notifications.map((notification) => (
          <li className="list-group-item mb-4 border agents-list-item" key={notification._id}>
            <strong className="sender-name">Sender Name:</strong> {notification.senderId.firstname}{' '}
            {notification.senderId.lastname}
            <br />
            <strong className="sender-email">Sender Email:</strong> {notification.senderId.email}
            <br />
            <strong className="message">Message:</strong> {notification.content}
            <br />
            <Link to={`/chat/${notification.senderId._id}`}>
              <button className="btn btn-primary message-button">
                Message
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Agents;
