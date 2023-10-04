import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {BsFillSendFill} from 'react-icons/bs'
import { useParams } from 'react-router-dom';

// Styled components
const Container = styled.div`
  display: flex;
  padding-top: 10vh;
  background-color: #f0f0f0;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const Sidebar = styled.div`
  flex: 1;
  background-color: #011932;
  color: #ffffff;
  padding: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const UserIcon = styled.i`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #011932;
`;

const UserName = styled.h1`
  font-size: 1.5rem;
  color: #011932;
  margin-bottom: 0.5rem;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap:10px;
`;

const StatItem = styled.div`
  text-align: center;
  flex: 1;
`;

const StatTitle = styled.p`
  margin: 0;
  color: #636566;
`;

const StatValue = styled.h1`
  margin: 0;
  font-size: 2rem;
  color: #011932;
`;

const ChatContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.nav`
  background-color: #011932;
  color: #ffffff;
  height: 10vh;
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const UserIconSmall = styled.i`
  font-size: 2rem;
  margin-right: 0.5rem;
`;

const ChatHeaderUsername = styled.h5`
  font-size: 1rem;
  margin: 0;
`;

const MessageList = styled.div`
    height:70vh;
    padding: 1rem;
    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCm51mGJUez8a2pl8xruCBtlE0f0wpHnetOdI-c4wbqOEn_uWnTAOBzDEn4lIl02hgmr0&usqp=CAU');
    background-size:cover;
    flex: 1;
    overflow-y: auto;
`;

const Message = styled.div`
  display: flex;
  justify-content: ${({ sender }) => (sender ? 'flex-start' : 'flex-end')};
  margin: 0.5rem;
`;

const MessageContent = styled.div`
  background-color: ${({ sender }) => (sender ? '#011932' : '#ffffff')};
  color: ${({ sender }) => (sender ? '#ffffff' : '#011932')};
  border-radius: ${({ sender }) =>
    sender ? '10px 10px 0 10px' : '10px 10px 10px 0'};
  padding: .6rem;
  gap:0;
  max-width: 70%;
  text-align:${({ sender }) => (sender ? 'start' : 'end')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MessageTimestamp = styled.span`
  font-size: 0.70rem;
  margin:0;
  color: #636566;
`;

const InputContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
`;

const Input = styled.input`
  flex: 1;
  background-color: #f0f0f0;
  color: #011932;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
`;

const SendButton = styled.button`
  width: 3rem;
  color: #011932;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.5rem;
`;

const Chat = () => {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [user,setUser] = useState({ }); 
  const [solved, setSolved] = useState([]);
  const [pending, setPending] =useState([]);
  const [total, setTotal] = useState([]);

  const userId = Cookies.get('userId')
  const { id } = useParams();

  useEffect(() => {
    
    getAgentData()
    getMessages();
    getUserDetails();
  }, []);

  const getMessages = async () => {
    const response = await axios.get('http://localhost:5100/messages');
    const updated = response.data.slice().reverse();
    setMessages(response.data);
  };

  const getUserDetails = async () => {
    try {
      
      const response = await axios.get(`http://localhost:5100/user/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const getAgentData = async () => {
    try{
        const response = await axios.get(`http://localhost:5100/customer-complaints/${userId}`)
        setTotal(response.data)
        const solved = response.data.filter((item) => item.status === "solved")
        const pending = response.data.filter((item) => item.status === 'pending')
        setSolved(solved)
        setPending(pending)
    } catch (error){
        console.error('Error fetching user details:', error);
    }
  }


  const sendComment = async (receiverId, message) => {
    const data = {
        senderId:userId,
        receiverId,
        content:message
    }

    try{
        const response = await axios.post(`http://localhost:5100/messages`, data)
        getMessages()
    }catch(e){
        console.log(e)
    }

  };

  const formatTimestamp = (timestamp) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(timestamp).toLocaleString(undefined, options);
  };

  return (
    <Container>
      <Sidebar>
        <Card>
          <UserIcon className="fas fa-user mb-2"></UserIcon>
          <UserName className="fs-5">{user.username}</UserName>
          <h3 style={{color:'#000',marginBottom:'0'}}>Complaint Details</h3>
          <StatsContainer>
            <StatItem>
              <StatTitle>Total</StatTitle>
              <StatValue>{total.length}</StatValue>
            </StatItem>
            <StatItem>
              <StatTitle>solved</StatTitle>
              <StatValue>{solved.length}</StatValue>
            </StatItem>
            <StatItem>
              <StatTitle>Pending</StatTitle>
              <StatValue>{pending.length}</StatValue>
            </StatItem>
          </StatsContainer>
        </Card>
      </Sidebar>
      <ChatContainer>
        <ChatHeader>
          <UserIconSmall className="fas fa-user mb-2"></UserIconSmall>
          <ChatHeaderUsername>{user.username}</ChatHeaderUsername>
        </ChatHeader>
        <MessageList>
          {messages.map((message) => (
            <Message key={message._id} sender={message.senderId !== userId}>
              <MessageContent sender={message.senderId !== userId}>
                <p style={{margin:'0'}}>{message.content}</p>
                <MessageTimestamp>{formatTimestamp(message.createdAt)}</MessageTimestamp>
              </MessageContent>
            </Message>
          ))}
        </MessageList>
        <InputContainer>
          <Input
            type="text"
            placeholder="Type a message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                sendComment(user._id, messageInput);
                setMessageInput('');
              }
            }}
          />
          <SendButton
            onClick={() => {
              sendComment(user._id, messageInput);
              setMessageInput('');
            }}
          >
            <BsFillSendFill/>
          </SendButton>
        </InputContainer>
      </ChatContainer>
    </Container>
  );
};

export default Chat;
