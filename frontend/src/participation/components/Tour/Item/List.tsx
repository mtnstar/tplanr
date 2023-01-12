import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ItemCategories, ItemCategory } from '../../../../model/Item';
import ItemListItem from '../../../../model/ItemListItem';
import { useParticipationTourItemsQuery } from '../../../utils/queries/useParticipationTourItemsQuery';

export default function ParticipationTourItemList() {
  const { uid: tourParticipationUid } = useParams();
  const { data: items } = useParticipationTourItemsQuery(tourParticipationUid!);
  function itemsByCategory(category: ItemCategory) {
    if (!items) return [];

    return items.filter((item: ItemListItem) => item.itemCategory === category);
  }

  const itemCategoryCards = ItemCategories.map((itemCategory: ItemCategory) => {
    const categoryItems = itemsByCategory(itemCategory);
    return (
      <div key={itemCategory}>
        <ItemsCard itemCategory={itemCategory} items={categoryItems} />
      </div>
    );
  });

  return <div className='tour-items'>{itemCategoryCards}</div>;
}

interface ItemsCardParams {
  itemCategory: ItemCategory;
  items: ItemListItem[];
  tourId?: string;
  itemListId?: string;
}

function ItemsCard(props: ItemsCardParams) {
  const { itemCategory, items } = props;
  const { t } = useTranslation();
  const itemCards = items.map((item: ItemListItem) => {
    return <ItemCard key={item.id} item={item} />;
  });

  const cardBody = (
    <div className='container'>
      {items.length > 0 && <div className='row row-cols-3'>{itemCards}</div>}
      {items.length === 0 && <p>{t('global.no_entries')}</p>}
    </div>
  );

  return (
    <div className='mb-4'>
      <Card>
        <Card.Header>
          <b>{t(itemCategory, { keyPrefix: 'itemCategories' })}</b>
        </Card.Header>
        <Card.Body>{cardBody}</Card.Body>
      </Card>
    </div>
  );
}

interface ItemCardParams {
  item: ItemListItem;
}

function getItemIsPacked(
  participationUid: string | undefined,
  item: ItemListItem,
) {
  if (!participationUid || !item.id) return false;

  return getItemsPackedEntries(participationUid)[item.id];
}

function getItemsPackedEntries(participationUid: string): ItemPackedEntries {
  const storeKey = itemsPackedStoreKey(participationUid);
  return (
    JSON.parse(`${localStorage.getItem(storeKey)}`) || ({} as ItemPackedEntries)
  );
}

function setItemIsPacked(
  participationUid: string | undefined,
  item: ItemListItem,
  isPacked: boolean,
) {
  if (!participationUid || !item.id) return;

  const itemsPackedEntries = getItemsPackedEntries(participationUid);
  itemsPackedEntries[`${item.id}`] = isPacked;

  const storeKey = itemsPackedStoreKey(participationUid);
  localStorage.setItem(storeKey, JSON.stringify(itemsPackedEntries));
}

interface ItemPackedEntries {
  [key: string]: boolean;
}

function itemsPackedStoreKey(participationUid: string) {
  return `itemsPacked-${participationUid}`;
}

function ItemCard(props: ItemCardParams) {
  const { item } = props;
  const { uid: participationUid } = useParams();
  const [isPacked, setIsPacked] = useState(
    getItemIsPacked(participationUid, item),
  );

  function itemPacked(isPacked: boolean) {
    setItemIsPacked(participationUid, item, isPacked);
    setIsPacked(isPacked);
  }

  return (
    <Card className='mb-2 col-12'>
      <Card.Body className='d-flex justify-content-between'>
        <div>
          <input
            type='checkbox'
            className='me-2'
            onChange={(e) => itemPacked(e.target.checked)}
            checked={isPacked}
          />
          <span className='item-label'>
            {item.count}x {item.labelDe}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}
