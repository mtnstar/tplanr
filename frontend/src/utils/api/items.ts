import { CaseType, deserialize } from 'jsonapi-fractal';
import { Item, ItemCategory } from '../../model/Item';
import { adapter } from './axios';

type Items = Item[];

export const searchItems = async (
  labelDe: string,
  itemCategory: ItemCategory,
): Promise<Items> => {
  const response = await adapter.get(`/api/items`, {
    params: { filter: { item_category: itemCategory, label_de: labelDe } },
  });
  const data = deserialize(response.data, {
    changeCase: CaseType.camelCase,
  }) as Item[];
  return data.map((entry: Item) => {
    return entry;
  });
};
