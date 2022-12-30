import { useTranslation } from 'react-i18next';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTourItemsQuery } from '../../../utils/queries/useTourItemsQuery';
import * as Icon from 'react-bootstrap-icons';
import { useMutation } from 'react-query';
import { queryClient } from '../../../index';
import {
  createOrUpdateTourItem,
  deleteTourItem,
} from '../../../utils/api/tour_items';
import TourItem from '../../../model/TourItem';
import { ItemCategories, ItemCategory } from '../../../model/Item';
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
  const { id: tourId } = useParams();
  const itemCards = items.map((item: TourItem) => {
    return <ItemCard key={item.id} item={item} />;
  });

  const createOrUpdate = useMutation(createOrUpdateTourItem, {
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ['tour-items', Number(tourId)],
        });
      }
    },
  });

  const addItem = (itemId: number) => {
    const newItem: TourItem = { itemId: itemId };
    createOrUpdate.mutate({ tourId: Number(tourId), entry: newItem });
  };

  const cardBody = (
    <div className='container'>
      <div className='row mb-4'>
        <ItemTypeAhead itemCategory={itemCategory} addItem={addItem} />
      </div>
      {items.length > 0 && <div className='row row-cols-3'>{itemCards}</div>}
      {items.length === 0 && <p>{t('global.no_entries')}</p>}
    </div>
  );

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
  const { id: tourId } = useParams();
  const createOrUpdate = useMutation(createOrUpdateTourItem, {
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ['tour-items', Number(tourId)],
        });
      }
    },
  });

  function increaseCount() {
    if (!item.count) return;
    item.count++;
    createOrUpdate.mutate({ tourId: Number(tourId), entry: item });
  }

  function decreaseCount() {
    if (!item.count) return;
    item.count--;
    createOrUpdate.mutate({ tourId: Number(tourId), entry: item });
  }

  const deleteItemMutation = useMutation(deleteTourItem, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['tour-items', Number(tourId)],
      });
    },
  });

  const deleteItem = () => {
    deleteItemMutation.mutate({ tourId: Number(tourId), entry: item });
  };

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
        <Button variant='outline-danger' size='sm' onClick={() => deleteItem()}>
          <Icon.Trash />
        </Button>
      </Card.Body>
    </Card>
  );
}
