import { AboutContainer, Title, Paragraph, ContactInfo, List, ListItem } from "./styledComponents";
const About = () => {
    return (
        <AboutContainer>
            <Title>About Us</Title>
            <Paragraph>
                Welcome to our website! We are a dedicated team passionate about bringing smiles through flower and gift delivery.
            </Paragraph>
            <Paragraph>
                At [Your Company Name], we believe in the power of gifting. Whether it's a birthday, anniversary, graduation, or any special occasion, the act of giving flowers and gifts has the ability to make moments unforgettable. Our carefully crafted arrangements and thoughtfully chosen gifts aim to capture the essence of your emotions.
            </Paragraph>
            <Paragraph>
                Our mission is to bring joy and warmth to people's lives. We take pride in the craftsmanship of our arrangements, ensuring that each bouquet tells a unique story. With an emphasis on quality, creativity, and personalization, we strive to make your gift truly one-of-a-kind.
            </Paragraph>
            <Paragraph>
                Why choose us?
            </Paragraph>
            <List>
                <ListItem>Wide Selection: We offer a diverse range of flowers and gifts to suit every occasion and taste.</ListItem>
                <ListItem>Quality Assurance: Our flowers are sourced from the finest growers and artisans to guarantee freshness and excellence.</ListItem>
                <ListItem>Timely Delivery: We understand the importance of timely deliveries, and we strive to bring your gifts right when you need them.</ListItem>
                <ListItem>Personalized Touch: Add a personal touch to your order with custom messages and special add-ons.</ListItem>
                <ListItem>Customer Satisfaction: Our priority is your satisfaction. If you're not delighted, we're not satisfied.</ListItem>
            </List>
            <Paragraph>
                Thank you for choosing us to be a part of your special moments. We look forward to serving you and spreading joy together!
            </Paragraph>
            <ContactInfo>
                Contact us at <a href="mailto:email@example.com">email@example.com</a> or <a href="tel:1234567890">123-456-7890</a> for any inquiries or assistance.
            </ContactInfo>
        </AboutContainer>
    );
};

export default About;