import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  const userId = Cookies.get('userId');

  useEffect(() => {
    getComplaintsData();
  }, [userId]);

  const getComplaintsData = async () => {
    try {
      const response = await axios.get(`http://localhost:5100/customer-complaints/${userId}`);
      setComplaints(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container" style={{marginTop:'12vh'}}>
      <div className="row">
        <div className="col-12">
          <h2 className="fw-bold">My Complaints</h2>
        </div>
      </div>
      <div className="row">
        {complaints.map((complaint) => (
          <div className="col-md-4 mb-4" key={complaint._id}>
            <div className={`card ${complaint.status === 'solved' ? 'border-success' : 'border-warning'}`}>
              <div className="card-body">
                <h5 className="card-title fs-5 fw-bold">
                  ID: {complaint._id}
                </h5>
                <p className="card-text fs-6">
                  <span className="fw-bold">Complaint:</span> {complaint.complaintDetails}
                </p>
                <p className="card-text fs-6">
                  <span className="fw-bold">Date:</span> {new Date(complaint.createdAt).toLocaleDateString()}
                </p>
                <p className={`card-text fs-6 fw-bold text-${complaint.status === 'solved' ? 'success' : 'warning'}`}>
                  Status: {complaint.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComplaints;
