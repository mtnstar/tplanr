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

  if (isList) {
    return (
      <>
        <ListNav />
      </>
    );
  } else {
    return <>{id ? <EntryNav entryId={+id} /> : <NewEntryNav />}</>;
  }
}

function ListNav() {
  return (
    <>
      <div className='d-flex justify-content-between'>
        <Breadcrumbs isList={true} />
        <ItemListsLink />
      </div>
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

function NewEntryNav() {
  const { t } = useTranslation();
  const tour: Tour = { label: t('new', { keyPrefix: 'tour' }) };
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

const tabLinkClassName = (active: boolean) => {
  let classes = ['nav-link'];
  if (active) classes.push('active');
  return classes.join(' ');
};

const isTourShowEditNew = (pathname: string) => {
  const routeRegex = [/new/, /edit/, /\/tours\/\d+$/];
  return routeRegex.some((re) => re.test(pathname));
};

const detailsTabLinkClassName = (pathname: string) => {
  let classes = ['nav-link'];
  if (isTourShowEditNew(pathname)) classes.push('active');
  return classes.join(' ');
};

function NavTabs(props: NavTabsProps) {
  const { tour } = props;
  const { t } = useTranslation();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <Nav variant='tabs'>
        {tour && (
          <Nav.Item>
            <NavLink
              className={detailsTabLinkClassName(pathname)}
              to={tour ? `/tours/${tour.id}` : ''}
              end
            >
              {t('details', { keyPrefix: 'tour' })}
            </NavLink>
          </Nav.Item>
        )}
        <Nav.Item>
          {tour?.id && (
            <NavLink
              className={({ isActive }) => tabLinkClassName(isActive)}
              to={`/tours/${tour.id}/sections`}
            >
              {t('many', { keyPrefix: 'section' })}
            </NavLink>
          )}
        </Nav.Item>
        <Nav.Item>
          {tour?.id && (
            <NavLink
              className={({ isActive }) => tabLinkClassName(isActive)}
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

interface BreadcrumbsProps {
  tour?: Tour;
  isList?: boolean;
}

function Breadcrumbs(props: BreadcrumbsProps) {
  const { tour, isList } = props;
  return (
    <Breadcrumb>
      <ListBreadcrumb tour={tour} />
      {!isList && <TourBreadcrumb tour={tour} />}
    </Breadcrumb>
  );
}

function ItemListsLink() {
  const { t } = useTranslation();
  return (
    <Link className='nav-link' to={'/item_lists'}>
      {t('many', { keyPrefix: 'itemList' })}
    </Link>
  );
}

function ListBreadcrumb(props: BreadcrumbsProps) {
  const { t } = useTranslation();
  const { tour } = props;
  const listLabel = t('many', { keyPrefix: 'tour' });
  return (
    <li className='breadcrumb-item'>
      {tour && (
        <Link className='nav-link' to={'/tours'}>
          {listLabel}
        </Link>
      )}
      {!tour && <>{listLabel}</>}
    </li>
  );
}

function TourBreadcrumb(props: BreadcrumbsProps) {
  const { t } = useTranslation();
  const { tour } = props;
  return (
    <li className='breadcrumb-item'>
      {tour ? tour.label : t('new', { keyPrefix: 'tour' })}
    </li>
  );
}
