import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import Sidebar from '../Sidebar';

function Dashboard() {
  const [complaints, setComplaints] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [agents, setAgents] = useState(0);

  const history = useNavigate();

  const data = [
    { name: 'Complaints', count: `Total complaints: ${complaints}`, routerLink: '/admin/complaints' },
    { name: 'Customers', count: `Total Customers: ${customers}`, routerLink: '/admin/customers' },
    { name: 'Agents', count: `Total Agents: ${agents}`, routerLink: '/admin/agents' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('adminJwtToken');
    if (!token) {
      history('/login');
    } else {
      // Fetch complaints
      fetch('http://localhost:5100/complaints')
        .then((response) => response.json())
        .then((data) => {
          setComplaints(data.length);
        })
        .catch((error) => {
          console.error('Error fetching complaints:', error);
        });

      // Fetch users
      fetch('http://localhost:5100/users')
        .then((response) => response.json())
        .then((data) => {
          const customerCount = data.filter((user) => user.type === 'user').length;
          const agentCount = data.filter((user) => user.type === 'agent').length;

          setCustomers(customerCount);
          setAgents(agentCount);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    }
  }, [history]);

  return (
    <div className='d-flex'>
      <Sidebar />
      <div className="container-fluid p-4 w-100" style={{ marginTop: '10vh' }}>
        <h2 style={{ fontSize: '26px', fontFamily: 'Roboto', fontWeight: 'bold' }}>Dashboard</h2>
        <div className="row">
          {data.map((item) => (
            <div className="col-md-6 col-sm-12" key={item.name}>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: 'bold' }}>{item.name}</h5>
                  <p className="card-text">{item.count}</p>
                  <a href={item.routerLink} className="btn btn-primary">Go to {item.name}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
