import Nav from 'react-bootstrap/Nav';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import { NavLink, Link, useParams, useLocation } from 'react-router-dom';
import { useTourQuery } from '../../utils/queries/useTourQuery';
import Tour from '../../model/Tour';

export default function TourNav() {
  const { id } = useParams();
  const location = useLocation();
  const isList = location.pathname === '/tours';

  if (!isList && id) {
    const entryId = +id;
    return (
      <>
        <EntryNav entryId={entryId} />
      </>
    );
  } else {
    return (
      <>
        <ListNav />
      </>
    );
  }
}

interface BreadcrumbsProps {
  tour?: Tour;
  isList: boolean;
}

function Breadcrumbs(props: BreadcrumbsProps) {
  const { t } = useTranslation();
  const { tour, isList } = props;
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link className='nav-link' to={'/tours'}>
          {t('many', { keyPrefix: 'tour' })}
        </Link>
      </Breadcrumb.Item>
      {!isList && (
        <li className='breadcrumb-item'>
          {tour ? tour.label : t('new', { keyPrefix: 'tour' })}
        </li>
      )}
    </Breadcrumb>
  );
}

function ListNav() {
  const { t } = useTranslation();
  return (
    <>
      <Breadcrumbs isList={true} />
      <Link className='btn btn-primary' to={'/tours/new'}>
        {t('new', { keyPrefix: 'tour' })}
      </Link>
      <NavTabs />
    </>
  );
}

interface EntryNavProps {
  entryId: number;
}

function EntryNav(prop: EntryNavProps) {
  const { entryId } = prop;
  const { data: tour } = useTourQuery(entryId);
  return (
    <>
      <Breadcrumbs isList={false} tour={tour} />
      <NavTabs tour={tour} />
    </>
  );
}

interface NavTabsProps {
  tour?: Tour;
}

function NavTabs(props: NavTabsProps) {
  const { tour } = props;
  const { t } = useTranslation();
  const linkClassName = (active: boolean) => {
    let classes = ['nav-link'];
    if (active) classes.push('active');
    return classes.join(' ');
  };
  return (
    <>
      <Nav variant='tabs'>
        {tour && (
          <Nav.Item>
            <NavLink
              className={({ isActive }) => linkClassName(isActive)}
              to={tour ? `/tours/${tour.id}` : ''}
              end
            >
              {t('details', { keyPrefix: 'tour' })}
            </NavLink>
          </Nav.Item>
        )}
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
