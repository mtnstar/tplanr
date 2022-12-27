export const ItemCategories = [
  'wearables',
  'gear',
  'food',
  'electronics',
  'other',
] as const;
export type ItemCategory = typeof ItemCategories[number];

type TourItem = {
  id?: number;
  labelDe?: string;
  descriptionDe?: string;
  itemCategory?: ItemCategory;
  count?: number;
  optional?: boolean;
};

export default TourItem;
