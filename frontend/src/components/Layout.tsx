import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import SportKindSelector from './Nav/SportKindSelector';
import useSportKind from '../utils/hooks/useSportKind';
import SportKindContext from '../utils/providers/SportKindContext';

function Layout() {

  const [sportKind, setSportKind] = useSportKind();
  const sportKindValue = { sportKind, setSportKind };

  return (
    <SportKindContext.Provider value={sportKindValue}>
      <Navbar expand="md" bg="dark" className="mb-3" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            <img
              alt=""
              src="/images/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            tplanr
          </Link>
          <SportKindSelector />
        </Container>
      </Navbar>

      <Container fluid="md">
        <Outlet />
      </Container>
    </SportKindContext.Provider>
  )
}

export default Layout;
