import {
  CaseType,
  deserialize,
  DocumentObject,
  transform,
} from 'jsonapi-fractal';
import { Item, ItemCategory } from '../../model/Item';
import ItemTransformer from '../transformers/ItemTransformer';
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

export const createOrUpdateItem = async (entry: Item) => {
  const serializedData = transform()
    .withInput(entry)
    .withTransformer(new ItemTransformer())
    .withOptions({ changeCase: CaseType.kebabCase })
    .serialize();

  let response = { data: undefined };

  if (entry.id) {
    response = await updateItem(entry, serializedData);
  } else {
    response = await createItem(serializedData);
  }

  const data = response.data;

  return data ? (deserialize(data) as Item) : undefined;
};

const updateItem = async (entry: Item, serializedData: DocumentObject) => {
  return adapter.patch(`/api/items/${entry.id}`, serializedData);
};

const createItem = async (serializedData: DocumentObject) => {
  return adapter.post('/api/items', serializedData);
};
