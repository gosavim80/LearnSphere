import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './css/LearnSphereNavbar.css'; // Import the CSS file

function LearnSphereNavbar() {
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="brand">
          <strong>LearnSphere</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {['/vocabulary', '/kanji', '/grammar'].map((path) => (
              <Nav.Link
                key={path}
                as={NavLink}
                to={path}
                className="nav-link" // Use className for styling
                activeClassName="active" // Add active class
              >
                {path === '/vocabulary' ? 'Vocabulary' : path === '/kanji' ? 'Kanji' : 'Grammar'}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LearnSphereNavbar;
