import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Item, { ItemCategories, ItemCategory } from '../../../model/Item';
import { useTourItemsQuery } from '../../../utils/queries/useTourItemsQuery';

export default function TourItemList() {
  const { id: tourId } = useParams();
  const { data: items } = useTourItemsQuery(+tourId!);
  function itemsByCategory(category: ItemCategory) {
    if (!items) return [];

    return items.filter((item) => item.itemCategory === category);
  }

  const itemCategoryCards = ItemCategories.map((itemCategory: ItemCategory) => {
    const categoryItems = itemsByCategory(itemCategory);
    return (
      <div key={itemCategory}>
        <ItemsCategoryCard itemCategory={itemCategory} items={categoryItems} />
      </div>
    );
  });

  return <div>{itemCategoryCards}</div>;
}

interface ItemsCatgegoryCardParams {
  itemCategory: ItemCategory;
  items: Item[];
}

function ItemsCategoryCard(props: ItemsCatgegoryCardParams) {
  const { itemCategory, items } = props;
  const { t } = useTranslation();
  const itemCards = items.map((item: Item) => {
    return (
      <>
        <ItemCard item={item} />
      </>
    );
  });

  return (
    <Card className='mt-4'>
      <Card.Header>
        <b>{t(itemCategory, { keyPrefix: 'item_categories' })}</b>
      </Card.Header>
      <Card.Body>{itemCards}</Card.Body>
    </Card>
  );
}

interface ItemCardParams {
  item: Item;
}

function ItemCard(props: ItemCardParams) {
  const { item } = props;
  return (
    <Card className='mt-4'>
      <Card.Body className='d-flex justify-content-between'>
        {item.labelDe}
      </Card.Body>
    </Card>
  );
}
