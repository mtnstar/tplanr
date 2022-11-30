import Nav from 'react-bootstrap/Nav';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useTourQuery } from '../../utils/queries/useTourQuery';
import Tour from '../../model/Tour';

interface BreadcrumbsParams {
  tour: Tour | undefined;
}

function Breadcrumbs(props: BreadcrumbsParams) {
  const { t } = useTranslation();
  const { tour } = props;
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link className='nav-link' to={'/tours'}>
          {t('many', { keyPrefix: 'tour' })}
        </Link>
      </Breadcrumb.Item>
      <li className='breadcrumb-item'>
        {tour ? tour.label : t('new', { keyPrefix: 'tour' })}
      </li>
    </Breadcrumb>
  );
}

function TourNav() {
  const linkClassName = (active: boolean) => {
    let classes = ['nav-link'];
    if (active) classes.push('active');
    return classes.join(' ');
  };

  const { id } = useParams();
  const { data: tour } = useTourQuery(+id!);
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumbs tour={tour} />
      <Nav variant='tabs'>
        <Nav.Item>
          <NavLink
            className={({ isActive }) => linkClassName(isActive)}
            to={tour ? `/tours/${tour.id}` : ''}
            end
          >
            {t('details', { keyPrefix: 'tour' })}
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          {tour && (
            <Link className='nav-link' to={`/tours/${tour.id}/sections`}>
              {t('many', { keyPrefix: 'section' })}
            </Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {tour && (
            <NavLink
              className={({ isActive }) => linkClassName(isActive)}
              to={`/tours/${tour.id}/items`}
            >
              {t('many', { keyPrefix: 'item' })}
            </NavLink>
          )}
        </Nav.Item>
      </Nav>
    </>
  );
}

export default TourNav;
