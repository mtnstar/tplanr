import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Layout() {
  return (
    <>
      <Navbar bg="light" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Tplanr</Navbar.Brand>
        </Container>
      </Navbar>

      <Outlet />
    </>
  )
}

export default Layout;
