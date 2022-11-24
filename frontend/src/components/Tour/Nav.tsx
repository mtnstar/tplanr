import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import Tour from '../../model/Tour';
import { useTourQuery } from '../../utils/queries/useTourQuery';

function TourNav() {
  const { id } = useParams();

  const { data } = useTourQuery(+id!);
  const { t } = useTranslation();

  const tour = data as Tour;

  if (tour) {
    return (
      <Nav variant='tabs'>
        <Nav.Item>
          <Link className='nav-link active' to={`/tours/${tour.id}`}>
            {tour.label}
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className='nav-link' to={`/tours/${tour.id}/sections`}>
            {t('many', { keyPrefix: 'section' })}
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className='nav-link' to={`/tours/${tour.id}/items`}>
            {t('many', { keyPrefix: 'item' })}
          </Link>
        </Nav.Item>
      </Nav>
    );
  }

  return <></>;
}

export default TourNav;
