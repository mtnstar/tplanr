import {
  CaseType,
  deserialize,
  DocumentObject,
  transform,
} from 'jsonapi-fractal';
import { ItemList } from '../../model/ItemList';
import { SportKind } from '../../model/SportKind';
import adapter from './axios';

export const fetchItemList = async (id: number): Promise<ItemList> => {
  const response = await adapter().get(`/api/item_lists/${id}`);
  const entry = deserialize(response.data, {
    changeCase: CaseType.camelCase,
  }) as ItemList;
  return entry;
};

export const createOrUpdateItemList = async (entry: ItemList) => {
  const serializedData = transform()
    .withInput(entry)
    .withOptions({ changeCase: CaseType.kebabCase })
    .serialize();

  let response = { data: undefined };

  if (entry.id) {
    response = await updateItemList(entry, serializedData);
  } else {
    response = await createItemList(serializedData);
  }

  const data = response.data;

  return data ? (deserialize(data) as ItemList) : undefined;
};

const updateItemList = async (
  entry: ItemList,
  serializedData: DocumentObject,
) => {
  return adapter().patch(`/api/item_lists/${entry.id}`, serializedData);
};

const createItemList = async (serializedData: DocumentObject) => {
  return adapter().post('/api/item_lists', serializedData);
};

type ItemLists = ReadonlyArray<ItemList>;

export const fetchItemLists = async (
  sportKind: SportKind,
): Promise<ItemLists> => {
  const response = await adapter().get('/api/item_lists', {
    params: { filter: { sport_kind: sportKind } },
  });
  if (!response) return [];

  const data = deserialize(response.data, {
    changeCase: CaseType.camelCase,
  }) as ItemList[];
  return data.map((entry: ItemList) => {
    return entry;
  });
};
