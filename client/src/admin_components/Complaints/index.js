import React, { useState, useEffect } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../Sidebar';

// Styled components
const MainContainer = styled.div`
  display:flex;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const AdminContent = styled.div`
margin-top:10vh;
  text-align: center;
`;

const ComplaintCard = styled.div`
  width: 100%;
  box-shadow: 0 0 20px #bbbbbb;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
`;

const CardTitle = styled.h5`
  font-weight: bold;
  font-size: 20px;
`;

const CardText = styled.p`
  font-weight: bold;
  font-size: 20px;
`;

const StatusButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusButton = styled.button`
  &.btn-success {
    background-color: #28a745;
  }
  &.btn-warning {
    background-color: #ffc107;
  }
`;

const SelectAgentContainer = styled.div`
  display: flex;
`;

// Component
const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminJwtToken');
    if (!token) {
      history('/login');
    } else {
      setIsLoading(true);

      // Fetch complaints
      fetch('http://localhost:5100/complaints')
        .then((response) => response.json())
        .then((data) => {
          setComplaints(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching complaints:', error);
          setIsLoading(false);
        });

      // Fetch agents
      fetch('http://localhost:5100/users')
        .then((response) => response.json())
        .then((data) => {
          const agentList = data.filter((user) => user.type === 'agent');
          setAgents(agentList);
        })
        .catch((error) => {
          console.error('Error fetching agents:', error);
        });
    }
  }, [history]);

  const onSubmitStatus = (id, status) => {
    setIsLoading(true);
    fetch(`http://localhost:5100/complaints/${id}/update-status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => response.json())
      .then(() => {
        // Refresh complaints after status update
        fetch('http://localhost:5100/complaints')
          .then((response) => response.json())
          .then((data) => {
            setComplaints(data);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        setIsLoading(false);
      });
  };

  const onAssign = (customerId, complaintId, selectedAgentId) => {
    const details = {
      customerId,
      complaintId,
      agentId: selectedAgentId,
    };
    setIsLoading(true);

    fetch(`http://localhost:5100/agents-complaints/${complaintId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    })
      .then(() => {
        setIsLoading(false);
        alert('Complaint Assigned Successfully!');
      })
      .catch((error) => {
        console.error('Error assigning complaint:', error);
        setIsLoading(false);
      });

    setSelectedAgent('');
  };

  return (
    <MainContainer>
      <Sidebar/>
        <div className='w-100' style={{marginTop:'10vh',height:'90vh',overflow:'auto'}}>
          {complaints.length === 0 && (
            <MainContainer>
              <AdminContent>
                <h2>No Complaints</h2>
                <p>
                  Welcome to the Admin section. Currently, there are no complaints to display.
                </p>
                {/* Add more content specific to the admin section here */}
              </AdminContent>
            </MainContainer>
          )}

          {complaints.length !== 0 && (
            <div className="container p-4">
              <div className="row">
                <div className="col-md-12">
                  <h2 style={{ fontWeight: 'bold' }}>All Complaints</h2>
                </div>
              </div>
              <div className="row">
                {complaints.map((complaint) => (
                  <div className="col-12 col-md-6" key={complaint._id}>
                    <ComplaintCard>
                      <div className="card-body text-start">
                        <CardTitle>
                          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Id:</span> {complaint._id}
                        </CardTitle>
                        <CardText>
                          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Complaint:</span>{' '}
                          {complaint.complaintDetails}
                        </CardText>
                        <CardText>
                          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Date:</span>{' '}
                          {new Date(complaint.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </CardText>
                        <StatusButtons>
                          {!complaint.showDropdown && (
                            <>
                              <CardText>
                                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Status:</span>{' '}
                                {complaint.status}
                              </CardText>
                              {complaint.status === 'pending' && (
                                <StatusButton
                                  className="btn btn-warning"
                                  onClick={() => (complaint.showDropdown = true)}
                                >
                                  Change Status
                                </StatusButton>
                              )}
                              {complaint.status === 'solved' && (
                                <StatusButton className="btn btn-success" disabled={true}>
                                  Completed
                                </StatusButton>
                              )}
                            </>
                          )}

                          {complaint.showDropdown && (
                            <div>
                              <select
                                className="form-select"
                                value={complaint.status}
                                onChange={(e) => (complaint.status = e.target.value)}
                              >
                                <option value="pending">Pending</option>
                                <option value="solved">Solved</option>
                              </select>
                              <StatusButton
                                className="btn btn-primary"
                                onClick={() => onSubmitStatus(complaint._id, complaint.status)}
                              >
                                Submit
                              </StatusButton>
                            </div>
                          )}
                        </StatusButtons>

                        <CardText>
                          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Agent Id:</span> {complaint.agent}
                        </CardText>
                        {complaint.agent === ' ' && <label>Select Agent</label>}
                        {complaint.agent === ' ' && (
                          <SelectAgentContainer>
                            <select
                              className="form-select"
                              value={complaint.selectedAgent}
                              onChange={(e) => setSelectedAgent(e.target.value)}
                            >
                              <option value="">Select an Agent</option>
                              {agents.map((agent) => (
                                <option key={agent._id} value={agent._id}>
                                  {agent.firstname}
                                </option>
                              ))}
                            </select>
                            <StatusButton
                              className="btn btn-primary"
                              onClick={() =>
                                onAssign(complaint.customer, complaint._id, selectedAgent)
                              }
                            >
                              Assign
                            </StatusButton>
                          </SelectAgentContainer>
                        )}
                        {complaint.agent !== ' ' && (
                          <StatusButton
                            className="btn btn-primary"
                            disabled={complaint.agent !== ' '}
                            onClick={() =>
                              onAssign(complaint.customer, complaint._id, complaint.selectedAgent)
                            }
                          >
                            Assigned to Agent
                          </StatusButton>
                        )}
                      </div>
                    </ComplaintCard>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
    </MainContainer>
  );
}

export default Complaints;
