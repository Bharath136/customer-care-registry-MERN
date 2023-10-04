import React, { useState, useEffect } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';

const AdminAgents = () => {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5100/users')
      .then((response) => response.json())
      .then((data) => {
        const agentList = data.filter((user) => user.type === 'agent');
        setAgents(agentList);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching agents:', error);
        setIsLoading(false);
      });
  }, [history]);

  return (
    <div className='d-flex'>
      <Sidebar />
      <div className='w-100' style={{height:'90vh',marginTop:'10vh'}}>
        {agents.length === 0 && (
          <div className="main-container">
            <div className="admin-content">
              <h2>No Agents</h2>
              <p>
                Welcome to the Admin section. Currently, there are no agents to display.
              </p>
              {/* Add more content specific to the admin section here */}
            </div>
          </div>
        )}

        {agents.length !== 0 && (
          <div className="container-fluid p-4 w-100">
            <h2 style={{ fontSize: '26px', fontFamily: 'Roboto', fontWeight: 'bold' }}>
              Agents
            </h2>
            <div className="row">
              {agents.map((item) => (
                <div className="col-md-6 col-sm-12" key={item.username}>
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontWeight: 'bold' }}>
                        Name: {item.username}
                      </h5>
                      <button className="btn btn-success" onClick={() => history('/admin/complaints')}>
                        Assign Complaint
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAgents;
