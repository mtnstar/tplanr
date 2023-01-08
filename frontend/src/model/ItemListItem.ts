import { ItemCategory } from './Item';

type ItemListItem = {
  id?: number;
  itemId?: number;
  labelDe?: string;
  descriptionDe?: string;
  itemCategory?: ItemCategory;
  count?: number;
  optional?: boolean;
};

export default ItemListItem;
