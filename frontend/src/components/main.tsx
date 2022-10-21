import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import SportKindSelector from './Nav/sport-kind-selector';
import { SportKinds, SportKind } from '../model/sport-kind';

function Main() {
  const [sportKind, setSportKind] = React.useState<SportKind>(SportKinds[0]);

  return (
    <>
      <Navbar expand="md" bg="dark" className="mb-3" variant="dark">
        <Container>
          <Link to="/tours" className="navbar-brand">
            <img
              alt=""
              src="/images/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            tplanr
          </Link>
          <SportKindSelector sportKind={sportKind} onSwitchSportKind={setSportKind}  />
        </Container>
      </Navbar>

      <Container fluid="md">
        <Navbar bg="light" >
          Secondary
        </Navbar>
      </Container>

      <Container fluid="md">
        {sportKind}
        <Outlet />
      </Container>
    </>
  )
}

export default Main;
