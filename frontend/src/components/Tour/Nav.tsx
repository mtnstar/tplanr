import Nav from 'react-bootstrap/Nav';
import { useTourQuery } from '../../utils/queries/useTourQuery';
import { useParams } from 'react-router-dom';
import Tour from '../../model/Tour';

function TourNav() {
  const { id } = useParams();

  const { data } = useTourQuery(+id!);

  const tour = data as Tour;

  if (tour) {
    const navTabs = NavTabs(tour);
    return <>{navTabs}</>;
  }

  return <></>;
}

function NavTabs(tour: Tour) {
  return (
    <Nav variant='tabs'>
      <Nav.Item>
        <Nav.Link href='/home'>{tour.label}</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='link-1'>Option 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='disabled' disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default TourNav;
