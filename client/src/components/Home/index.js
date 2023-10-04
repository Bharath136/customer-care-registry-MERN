import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  padding: 2rem;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

const TextContainer = styled.div`
  flex: 1;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 2rem;
  font-size: 1rem;
`;

const Home = () => {
  return (
    <Container>
      <ContentContainer>
        <TextContainer>
          <Title>Welcome to Customer Care Registry</Title>
          <Description>
            Click the "Raise Complaint" button to resolve your doubts or seek assistance from our support team.
          </Description>
          <Button onClick={() => window.location.href = '/complaint'}>Raise Complaint</Button>
        </TextContainer>
        <ImageContainer>
          <Image src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=740&t=st=1685422012~exp=1685422612~hmac=c4853fe649840bb925e5f63474cb51088aef2be71804399309fb6378bf102d61" alt="Customer Support" />
        </ImageContainer>
      </ContentContainer>
      <Footer>&copy; 2023 Customer Care Registry</Footer>
    </Container>
  );
};

export default Home;
