import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';

function ParticipationLayout() {
  return (
    <>
      <Navbar expand='md' bg='dark' className='mb-3' variant='dark'>
        <Container className='d-flex justify-content-between'>
          <div className='navbar-brand'>
            <img
              alt=''
              src='/images/logo.svg'
              width='30'
              height='30'
              className='d-inline-block align-top'
            />{' '}
            tplanr
          </div>
        </Container>
      </Navbar>

      <Container fluid='md'>
        <Outlet />
      </Container>
    </>
  );
}

export default ParticipationLayout;
