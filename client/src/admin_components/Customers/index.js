import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5100/users')
      .then((response) => response.json())
      .then((data) => {
        const userCustomers = data.filter((user) => user.type === 'user');
        setCustomers(userCustomers);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className='d-flex'>
      <Sidebar/>
      <div className='w-100' style={{height:'90vh',marginTop:'10vh'}}>
      {!isLoading && (
        <div>
          {customers.length === 0 && (
            <div className="main-container">
              <div className="admin-content">
                <h2>No Complaints</h2>
                <p>Welcome to the Admin section. Currently, there are no complaints to display.</p>
                {/* Add more content specific to the admin section here */}
              </div>
            </div>
          )}

          {customers.length !== 0 && (
            <div className="container-fluid p-4 w-100">
              <h2 style={{ fontSize: '26px', fontFamily: 'Roboto', fontWeight: 'bold' }}>
                Customers
              </h2>
              <div className="row">
                {customers.map((item) => (
                  <div className="col-md-6 col-sm-12" key={item.username}>
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title" style={{ fontWeight: 'bold' }}>
                          {item.username}
                        </h5>
                        <p className="card-text">Email: {item.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  );
}

export default Customers;
