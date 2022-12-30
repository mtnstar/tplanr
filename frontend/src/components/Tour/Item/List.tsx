import { useTranslation } from 'react-i18next';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTourItemsQuery } from '../../../utils/queries/useTourItemsQuery';
import * as Icon from 'react-bootstrap-icons';
import { useMutation } from 'react-query';
import { queryClient } from '../../../index';
import { createOrUpdateTourItem } from '../../../utils/api/tour_items';
import TourItem from '../../../model/TourItem';
import { Item, ItemCategories, ItemCategory } from '../../../model/Item';
import ItemTypeAhead from './TypeAhead';

export default function TourItemList() {
  const { id: tourId } = useParams();
  const { data: items } = useTourItemsQuery(+tourId!);
  function itemsByCategory(category: ItemCategory) {
    if (!items) return [];

    return items.filter((item: TourItem) => item.itemCategory === category);
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
  items: TourItem[];
}

function ItemsCard(props: ItemsCardParams) {
  const { itemCategory, items } = props;
  const { t } = useTranslation();
  const itemCards = items.map((item: TourItem) => {
    return <ItemCard key={item.id} item={item} />;
  });

  const addItem = (item: Item) => {
    return undefined;
  };

  let cardBody = <p>{t('global.no_entries')}</p>;

  if (items.length > 0) {
    cardBody = (
      <div className='container'>
        <div className='row mb-4'>
          <ItemTypeAhead
            itemCategory={itemCategory}
            addItem={(item) => addItem(item)}
          />
        </div>
        <div className='row row-cols-3'>{itemCards}</div>
      </div>
    );
  }

  return (
    <div className='mb-4'>
      <Card>
        <Card.Header>
          <b>{t(itemCategory, { keyPrefix: 'item_categories' })}</b>
        </Card.Header>
        <Card.Body>{cardBody}</Card.Body>
      </Card>
    </div>
  );
}

interface ItemCardParams {
  item: TourItem;
}

function ItemCard(props: ItemCardParams) {
  const { item } = props;
  const createOrUpdate = useMutation(createOrUpdateTourItem, {
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ['tour-items', Number(item.id)],
        });
      }
    },
  });

  function increaseCount() {
    if (!item.count) return;
    item.count++;
    createOrUpdate.mutate(item);
  }

  function decreaseCount() {
    if (!item.count) return;
    item.count--;
    createOrUpdate.mutate(item);
  }

  return (
    <Card className='me-4 col'>
      <Card.Body className='d-flex justify-content-between'>
        <div>
          <div className='btn-group me-2'>
            <Button
              disabled={item.count === 1}
              variant='outline-dark'
              size='sm'
              onClick={() => decreaseCount()}
            >
              <Icon.Dash />
            </Button>
            <Button
              variant='outline-dark'
              disabled={item.count === 20}
              size='sm'
              onClick={() => increaseCount()}
            >
              <Icon.Plus />
            </Button>
          </div>
          <span className='item-label'>
            {item.count}x {item.labelDe}
          </span>
        </div>
        <Button variant='outline-danger' size='sm'>
          <Icon.Trash />
        </Button>
      </Card.Body>
    </Card>
  );
}
