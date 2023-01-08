import adapter from './axios';
import {
  CaseType,
  deserialize,
  DocumentObject,
  transform,
} from 'jsonapi-fractal';
import ItemListItem from '../../model/ItemListItem';
import ItemListItemTransformer from '../transformers/ItemListItemTransformer';

interface templateItemParams {
  itemListId: number;
  entry: ItemListItem;
}

export const fetchTemplateItem = async (
  itemListId: number,
  id: number,
): Promise<ItemListItem> => {
  const response = await adapter().get(
    `/api/item_lists/${itemListId}/items/${id}`,
  );
  const entry = deserialize(response.data, {
    changeCase: CaseType.camelCase,
  }) as ItemListItem;
  return entry;
};

type TemplateItems = ReadonlyArray<ItemListItem>;

export const fetchTemplateItems = async (
  itemListId: number,
): Promise<TemplateItems> => {
  const response = await adapter().get(`/api/item_lists/${itemListId}/items`);
  const data = deserialize(response.data, {
    changeCase: CaseType.camelCase,
  }) as ItemListItem[];
  return data.map((entry: ItemListItem) => {
    return entry;
  });
};

export const createOrUpdateTemplateItem = async (
  params: templateItemParams,
) => {
  const { itemListId, entry } = params;
  const serializedData = transform()
    .withInput(entry)
    .withTransformer(new ItemListItemTransformer())
    .withOptions({ changeCase: CaseType.kebabCase })
    .serialize();

  let response = { data: undefined };

  if (entry.id) {
    response = await updateTemplateItem(itemListId, entry, serializedData);
  } else {
    response = await createTemplateItem(itemListId, serializedData);
  }

  const data = response.data;

  return data ? (deserialize(data) as ItemListItem) : undefined;
};

const updateTemplateItem = async (
  itemListId: number,
  entry: ItemListItem,
  serializedData: DocumentObject,
) => {
  return adapter().patch(
    `/api/item_lists/${itemListId}/items/${entry.id}`,
    serializedData,
  );
};

const createTemplateItem = async (
  itemListId: number,
  serializedData: DocumentObject,
) => {
  return adapter().post(`/api/item_lists/${itemListId}/items`, serializedData);
};

export const deleteTemplateItem = async (
  params: templateItemParams,
): Promise<ItemListItem> => {
  const { itemListId, entry } = params;
  const response = await adapter().delete(
    `/api/item_lists/${itemListId}/items/${entry.id}`,
  );
  return response.data;
};
