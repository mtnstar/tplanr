export const ItemCategories = [
  'wearables',
  'gear',
  'food',
  'electronics',
  'other',
] as const;
export type ItemCategory = typeof ItemCategories[number];

type Item = {
  id?: number;
  labelDe?: string;
  descriptionDe?: string;
  itemCategory?: ItemCategory;
};

export default Item;
