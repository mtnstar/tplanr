import { useTranslation } from 'react-i18next';
import { Button, Card } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import { useTourItemsQuery } from '../../utils/queries/useTourItemsQuery';
import * as Icon from 'react-bootstrap-icons';
import { useMutation } from 'react-query';
import {
  createOrUpdateTourItem,
  deleteTourItem,
} from '../../utils/api/tour_items';
import { Item, ItemCategories, ItemCategory } from '../../model/Item';
import { createOrUpdateItem } from '../../utils/api/items';
import { queryClient } from '../../App';
import ItemTypeAhead from './TypeAhead';
import ItemListItem from '../../model/ItemListItem';
import { useTemplateItemsQuery } from '../../utils/queries/useTemplateItemsQuery';
import {
  createOrUpdateTemplateItem,
  deleteTemplateItem,
} from '../../utils/api/template_items';
import { useTourQuery } from '../../utils/queries/useTourQuery';
import TourItemListNew from '../Tour/ItemList/New';

export default function ItemList() {
  const location = useLocation();
  const { id: tourId } = useParams();
  const { data: tour } = useTourQuery(Number(tourId));

  if (/^\/tours/.test(location.pathname)) {
    if (tour && tour.itemListId === null) {
      return <TourItemListNew />;
    } else {
      return <TourItemList />;
    }
  } else {
    return <TemplateItemList />;
  }
}

function TourItemList() {
  const { id: tourId } = useParams();
  const { data: items } = useTourItemsQuery(+tourId!);

  return (
    <>
      <ItemsByCategory items={items} tourId={tourId} />
    </>
  );
}

function TemplateItemList() {
  const { id: itemListId } = useParams();
  const { data: items } = useTemplateItemsQuery(+itemListId!);
  return (
    <>
      <ItemsByCategory items={items} itemListId={itemListId} />
    </>
  );
}

interface ItemsByCategoryParams {
  items?: readonly ItemListItem[];
  tourId?: string;
  itemListId?: string;
}

function ItemsByCategory(props: ItemsByCategoryParams) {
  const { items, tourId, itemListId } = props;
  function itemsByCategory(category: ItemCategory) {
    if (!items) return [];

    return items.filter((item: ItemListItem) => item.itemCategory === category);
  }

  const itemCategoryCards = ItemCategories.map((itemCategory: ItemCategory) => {
    const categoryItems = itemsByCategory(itemCategory);
    return (
      <div key={itemCategory}>
        <ItemsCard
          itemCategory={itemCategory}
          items={categoryItems}
          tourId={tourId}
          itemListId={itemListId}
        />
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
  const { itemCategory, items, tourId, itemListId } = props;
  const { t } = useTranslation();
  const itemCards = items.map((item: ItemListItem) => {
    return (
      <ItemCard
        key={item.id}
        item={item}
        tourId={tourId}
        itemListId={itemListId}
      />
    );
  });

  const createUpdateTourItem = useMutation(createOrUpdateTourItem, {
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ['tourItems', Number(tourId)],
        });
      }
    },
  });

  const createUpdateTemplateItem = useMutation(createOrUpdateTemplateItem, {
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ['itemListItems', Number(itemListId)],
        });
      }
    },
  });

  const createAndAddNewTourItem = useMutation(createOrUpdateItem, {
    onSuccess: (data) => {
      if (data) {
        const newTourItem: ItemListItem = { itemId: data.id };
        createUpdateTourItem.mutate({
          tourId: Number(tourId),
          entry: newTourItem,
        });
      }
    },
  });

  const createAndAddNewTemplateItem = useMutation(createOrUpdateItem, {
    onSuccess: (data) => {
      if (data) {
        const newTourItem: ItemListItem = { itemId: data.id };
        createUpdateTemplateItem.mutate({
          itemListId: Number(itemListId),
          entry: newTourItem,
        });
      }
    },
  });

  const addItem = (item: Item) => {
    if (isNaN(Number(item.id))) {
      item.itemCategory = itemCategory;
      item.id = undefined;
      if (tourId) {
        createAndAddNewTourItem.mutate(item);
      }
      if (itemListId) {
        createAndAddNewTemplateItem.mutate(item);
      }
    } else {
      const newItem: ItemListItem = { itemId: item.id };
      if (tourId) {
        createUpdateTourItem.mutate({ tourId: Number(tourId), entry: newItem });
      }
      if (itemListId) {
        createUpdateTemplateItem.mutate({
          itemListId: Number(itemListId),
          entry: newItem,
        });
      }
    }
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
  item: ItemListItem;
  tourId?: string;
  itemListId?: string;
}

function ItemCard(props: ItemCardParams) {
  const { item, tourId, itemListId } = props;
  const createOrUpdateTourItemMutation = useMutation(createOrUpdateTourItem, {
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ['tourItems', Number(tourId)],
        });
      }
    },
  });

  const createOrUpdateTemplateItemMutation = useMutation(
    createOrUpdateTemplateItem,
    {
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries({
            queryKey: ['itemListItems', Number(itemListId)],
          });
        }
      },
    },
  );

  function updateItem(item: ItemListItem) {
    if (tourId) {
      createOrUpdateTourItemMutation.mutate({
        tourId: Number(tourId),
        entry: item,
      });
    }
    if (itemListId) {
      createOrUpdateTemplateItemMutation.mutate({
        itemListId: Number(itemListId),
        entry: item,
      });
    }
  }

  function increaseCount() {
    if (!item.count) return;
    item.count++;
    updateItem(item);
  }

  function decreaseCount() {
    if (!item.count) return;
    item.count--;
    updateItem(item);
  }

  const deleteTourItemMutation = useMutation(deleteTourItem, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['tourItems', Number(tourId)],
      });
    },
  });

  const deleteTemplateItemMutation = useMutation(deleteTemplateItem, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['itemListItems', Number(itemListId)],
      });
    },
  });

  const deleteItem = () => {
    if (tourId) {
      deleteTourItemMutation.mutate({ tourId: Number(tourId), entry: item });
    }
    if (itemListId) {
      deleteTemplateItemMutation.mutate({
        itemListId: Number(itemListId),
        entry: item,
      });
    }
  };

  return (
    <Card className='mb-2 col'>
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
