import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'

const NavBar = (props) => {

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link active={props.location.pathname === '/'} href="/">Add Scan Result</Nav.Link>
            <Nav.Link active={props.location.pathname === '/scan_results'} href="/scan_results">Scan Results</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default withRouter(NavBar);