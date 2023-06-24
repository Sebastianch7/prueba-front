import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';


export default function Menu({children}) {

  return (
    <>
      <Navbar bg="primary" variant="dark" className='mb-4'>
        <Container fluid>
          <Navbar.Brand href="https://sebastianch7.github.io/" target='_blank'>Sebastian Chaparro</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Dashboard</Nav.Link>
              <Nav.Link href="/create">Registrar</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        {children}
      </Container>
    </>
  )
}
