import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import './NavigationBar.css';
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown, Dropdown } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.state.auth.token,
        userId: state.state.auth.userId,
        type: state.state.auth.account_type,
    }
}

class NavigationBar extends Component {
    render() {
        return (
            <Navbar expand="lg" className='navbar-dark foodPandaBG shadow sticky-top fs-5'>
                <Container fluid>
                    <a className="navbar-brand" href="/"><img src={logo} alt="brand" width="60px" /></a>
                    {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <NavLink className="nav-link mx-3" to="/category" end>Vehicle Category</NavLink>
                            {this.props.type === 'owner' ? <NavLink className='nav-link' to="/add-car">Add Vehicle</NavLink> : <></>}
                        </Nav>

                        {this.props.token && this.props.token ?
                            <Nav className="ms-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll>
                                <NavDropdown title="Profile" id="navbarScrollingDropdown">
                                    <Dropdown.Item as={Link} to="/" className='text-danger'>Edit Profile</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
                                </NavDropdown>
                            </Nav> :
                            <Nav className="ms-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll>
                                <NavDropdown title="User" id="navbarScrollingDropdown">
                                    <Dropdown.Item as={Link} to="/auth">Login</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/auth">Registration</Dropdown.Item>
                                </NavDropdown>
                            </Nav>}

                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-light">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default connect(mapStateToProps)(NavigationBar);