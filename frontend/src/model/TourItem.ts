import { ItemCategory } from './Item';

type TourItem = {
  id?: number;
  itemId?: number;
  labelDe?: string;
  descriptionDe?: string;
  itemCategory?: ItemCategory;
  count?: number;
  optional?: boolean;
};

export default TourItem;