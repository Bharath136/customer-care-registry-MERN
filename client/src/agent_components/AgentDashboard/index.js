import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

// Styled components for the card
const Card = styled.div`

  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const Detail = styled.div`
  margin-bottom: 10px;
`;

const AgentDashboard = () => {
  const [data, setData] = useState([]);
  const id = Cookies.get('userId');

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:5100/complaints/${id}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="container" style={{marginTop:'10vh'}}>
      <h1>Dashboard</h1>
      {data.map((complaint, index) => (
        <Card key={index}>
          <Title>Complaint Details</Title>
          <Detail>
            <strong>Complaint:</strong> {complaint.complaintDetails}
          </Detail>
          <Detail>
            <strong>Customer Name:</strong> {complaint.customer.username}
          </Detail>
          <Detail>
            <strong>Agent ID:</strong> {complaint.agent}
          </Detail>
          
          <button className="btn"><Link class="btn btn-primary" to={`/agent/chat/${complaint.customer._id}`}>Message</Link></button>
        </Card>
      ))}
    </div>
  );
}

export default AgentDashboard;
