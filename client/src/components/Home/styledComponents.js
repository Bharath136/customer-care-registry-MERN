import styled from 'styled-components';


export const HomeContainer = styled.section`
  background-image: url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00MjgtMDAwMV8xLWtzMDRzd2RwLmpwZw.jpg');
  background-size: cover;
  background-position: center;
  color: #fff;
  height:90vh;
  margin-top:10vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align: center;
  padding: 150px 0;
`;


export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const CenteredRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ContentColumn = styled.div`
  flex: 1;
  text-align: center;
`;

export const Heading = styled.h2`
  font-size: 3rem;
  margin-bottom: 15px;
`;

export const Paragraph = styled.p`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 20px;
`;

export const PrimaryButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #ff69b4; /* Pink color */
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #ff3781; /* Darker pink for hover */
  }
`;