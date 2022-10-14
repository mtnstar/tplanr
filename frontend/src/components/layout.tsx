import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import SportKindSelector from './Nav/sport_kind_selector';

function Layout() {
  return (
    <>
      <Navbar expand="md" bg="dark" className="mb-3" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/images/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            tplanr
          </Navbar.Brand>
          <SportKindSelector />
        </Container>
      </Navbar>

      <Container fluid="md">
        <Navbar bg="light" >
          Secondary
        </Navbar>
      </Container>

      <Container fluid="md">
        <Outlet />
      </Container>
    </>
  )
}

export default Layout;
