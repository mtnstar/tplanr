import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Layout() {
  return (
    <>
      <Navbar bg="dark" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Tplanr</Navbar.Brand>
        </Container>
      </Navbar>

      <button className="btn btn-primary">Test</button>

      <Outlet />
    </>
  )
}

export default Layout;
