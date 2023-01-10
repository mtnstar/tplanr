import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useLocation } from 'react-router-dom';
import { ItemList } from '../../model/ItemList';
import { useItemListQuery } from '../../utils/queries/useItemListQuery';

export default function ItemListNav() {
  const { id } = useParams();
  const location = useLocation();
  const isList = location.pathname === '/item_lists';

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
        <ToursLink />
      </div>
    </>
  );
}

interface EntryNavProps {
  entryId: number;
}

function EntryNav(prop: EntryNavProps) {
  const { entryId } = prop;
  const { data: itemList } = useItemListQuery(entryId);
  return (
    <>
      <Breadcrumbs isList={false} itemList={itemList} />
    </>
  );
}

function NewEntryNav() {
  const { t } = useTranslation();
  const itemList: ItemList = {
    templateLabel: t('new', { keyPrefix: 'itemList' }),
  };
  return (
    <>
      <Breadcrumbs isList={false} itemList={itemList} />
    </>
  );
}

interface BreadcrumbsProps {
  itemList?: ItemList;
  isList?: boolean;
}

function Breadcrumbs(props: BreadcrumbsProps) {
  const { itemList, isList } = props;
  return (
    <Breadcrumb>
      <ListBreadcrumb itemList={itemList} />
      {!isList && <ItemListBreadcrumb itemList={itemList} />}
    </Breadcrumb>
  );
}

function ToursLink() {
  const { t } = useTranslation();
  return (
    <Link className='btn btn-secondary' to={'/tours'}>
      {t('many', { keyPrefix: 'tour' })}
    </Link>
  );
}

function ListBreadcrumb(props: BreadcrumbsProps) {
  const { t } = useTranslation();
  const { itemList } = props;
  const listLabel = t('many', { keyPrefix: 'itemList' });
  return (
    <li className='breadcrumb-item'>
      {itemList && (
        <Link className='nav-link' to={'/item_lists'}>
          {listLabel}
        </Link>
      )}
      {!itemList && <>{listLabel}</>}
    </li>
  );
}

function ItemListBreadcrumb(props: BreadcrumbsProps) {
  const { t } = useTranslation();
  const { itemList } = props;
  return (
    <li className='breadcrumb-item'>
      {itemList ? itemList.templateLabel : t('new', { keyPrefix: 'itemList' })}
    </li>
  );
}
