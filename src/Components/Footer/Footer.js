import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Row, Column, Heading, } from "./FooterStyles";
import '../../StyleSheets/footer.css';

const Footer = () => {
    return (
        <Box>
            <h1 style={{
                color: "green",
                textAlign: "center",
                marginTop: "-50px"
            }}>
                A <strong>Single Page</strong> Car Renting site using React with User Authentication and Django-Rest-Framework as Backend
            </h1>
            <Container>
                <Row>
                    <Column>
                        <Heading>About Us</Heading>
                        <Link className="myFooterLink" to="#">Aim</Link>
                        <Link className="myFooterLink" to="#">Vision</Link>
                        <Link className="myFooterLink" to="#">Testimonials</Link>
                    </Column>
                    <Column>
                        <Heading>Services</Heading>
                        <Link className="myFooterLink" to="#">Writing</Link>
                        <Link className="myFooterLink" to="#">Internships</Link>
                        <Link className="myFooterLink" to="#">Coding</Link>
                        <Link className="myFooterLink" to="#">Teaching</Link>
                    </Column>
                    <Column>
                        <Heading>Contact Us</Heading>
                        <Link className="myFooterLink" to="/contact-ah-munna">AH Munna</Link>
                        <Link className="myFooterLink" to="#">Sector-14</Link>
                        <Link className="myFooterLink" to="#">Uttara</Link>
                        <Link className="myFooterLink" to="#">Dhaka</Link>
                    </Column>
                    <Column>
                        <Heading>Social Media</Heading>
                        <Link className="myFooterLink" to="#">
                            <i className="fab fa-facebook-f text-primary"></i>
                            <span style={{ marginLeft: "10px" }}>
                                Facebook
                            </span>
                        </Link>
                        <Link className="myFooterLink" to="#">
                            <i className="fab fa-instagram bg-danger text-white"></i>
                            <span style={{ marginLeft: "10px" }}>
                                Instagram
                            </span>
                        </Link>
                        <Link className="myFooterLink" to="#">
                            <i className="fab fa-twitter text-info"></i>
                            <span style={{ marginLeft: "10px" }}>
                                Twitter
                            </span>
                        </Link>
                        <Link className="myFooterLink" to="#">
                            <i className="fab fa-youtube text-danger"></i>
                            <span style={{ marginLeft: "10px" }}>
                                Youtube
                            </span>
                        </Link>
                    </Column>
                </Row>
            </Container>
        </Box>
    );
};
export default Footer;
