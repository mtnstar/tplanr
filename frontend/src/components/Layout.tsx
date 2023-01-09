import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
  Location,
  NavigateFunction,
} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import useSportKind from '../utils/hooks/useSportKind';
import SportKindContext from '../utils/providers/SportKindContext';
import CurrentUserContext from '../utils/providers/CurrentUserContext';
import UserDropDown from './Nav/UserDropDown';
import { useEffect, useState } from 'react';
import User from '../model/User';
import { getCurrentUser } from '../utils/services/authentication';
import SportKindSelector from './Nav/SportKindSelector';

function redirectUnlessLoggedIn(
  location: Location,
  navigate: NavigateFunction,
) {
  if (location.pathname !== '/login' && !getCurrentUser()) {
    navigate('/login');
  }
  if (location.pathname === '/login' && getCurrentUser()) {
    navigate('/');
  }
}

function Layout() {
  const [sportKind, setSportKind] = useSportKind();
  const sportKindValue = { sportKind, setSportKind };
  const [currentUser, setCurrentUser] = useState<User>(getCurrentUser() || {});
  const currentUserValue = { currentUser, setCurrentUser };
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    redirectUnlessLoggedIn(location, navigate);
  });

  return (
    <CurrentUserContext.Provider value={currentUserValue}>
      <SportKindContext.Provider value={sportKindValue}>
        <Navbar expand='md' bg='dark' className='mb-3' variant='dark'>
          <Container className='d-flex justify-content-between'>
            <Link to='/' className='navbar-brand'>
              <img
                alt=''
                src='/images/logo.svg'
                width='30'
                height='30'
                className='d-inline-block align-top'
              />{' '}
              tplanr
            </Link>
            <div className='btn-group'>
              {currentUser.token && <SportKindSelector />}
              {currentUser.token && <UserDropDown />}
            </div>
          </Container>
        </Navbar>

        <Container fluid='md'>
          <Outlet />
        </Container>
      </SportKindContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default Layout;
