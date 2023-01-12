import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ItemCategories, ItemCategory } from '../../../../model/Item';
import ItemListItem from '../../../../model/ItemListItem';
import { useParticipationTourItemsQuery } from '../../../utils/queries/useParticipationTourItemsQuery';

export default function ParticipationTourItemList() {
  const { uid: tourParticipationUid } = useParams();
  console.log(tourParticipationUid);
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

function ItemCard(props: ItemCardParams) {
  const { item } = props;

  return (
    <Card className='mb-2 col'>
      <Card.Body className='d-flex justify-content-between'>
        <div>
          <span className='item-label'>
            {item.count}x {item.labelDe}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}
