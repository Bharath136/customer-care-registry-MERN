import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  // flex-wrap: wrap;
  min-height: 100vh;
  margin-top: 10vh;
  padding: 20px;
  align-items: center;
  background-color: #f0f0f0;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  order: 1;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px; /* Rounded corners for the image */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
`;

const TextContainer = styled.div`
  flex: 1;
  order: 2;
  width: 100%;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  color: #333; /* Dark gray text color */
`;

const Form = styled.form`
  margin-top: 1rem;
  text-align: start;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc; /* Add a light gray border */
  border-radius: 5px; /* Rounded corners for the input */
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc; /* Add a light gray border */
  border-radius: 5px; /* Rounded corners for the textarea */
  resize: none; /* Disable textarea resizing */
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s; /* Smooth hover effect */
  
  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
`;

const SuccessMessage = styled.div`
  color: green;
  font-weight: bold;
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  margin-top: 1rem;
`;

const Complaint = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [complaint, setComplaint] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    // Validate email and phone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    const userId = Cookies.get('userId')

    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email address');
      return;
    }

    if (!phoneRegex.test(phone)) {
      setErrorMessage('Invalid phone number (10 digits required)');
      return;
    }

    // Prepare the data object with all fields
    const data = {
      customer:userId,
      name,
      phone,
      email,
      complaintDetails:complaint,
    };

    axios.post('http://localhost:5100/complaints', data)
      .then((response) => {
        // Handle the response, e.g., show a success message or redirect
        setSuccessMessage('Complaint submitted successfully');
        setErrorMessage('');
        setComplaint('')
        setEmail('')
        setName('')
        setPhone('')
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        setErrorMessage('Failed to submit complaint');
        console.error('Failed to submit complaint', error);
        setSuccessMessage('');
      });
  };

  return (
    <Container className="container-fluid">
      <ImageContainer className="col-md-6 order-md-1 mb-4">
        <Image
          src="https://st3.depositphotos.com/7865540/13884/i/600/depositphotos_138842482-stock-photo-concept-on-tablet-pc-screen.jpg"
          alt="Complaint Image"
          className="image img-fluid"
        />
      </ImageContainer>
      <TextContainer className="col-md-6 order-md-2 text-center">
        <Heading className="heading">Write Your Complaint</Heading>
        <div>
          <Form onSubmit={onSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Input
                placeholder='Enter name'
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <Input
                placeholder='Enter phone'
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                placeholder='Enter email'
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="complaint">Complaint Details</label>
              <Textarea
                placeholder="Describe your complaint here..."
                rows="10"
                className="form-control"
                id="complaint"
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                required
              ></Textarea>
              {/* Add validation error message here */}
            </div>
            <div className="w-100 text-end">
              <SubmitButton type="submit" className="btn btn-primary mt-4 mb-4">
                Submit
              </SubmitButton>
            </div>
            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Form>
        </div>
      </TextContainer>
    </Container>
  );
};

export default Complaint;
