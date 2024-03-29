import adapter from './axios';
import {
  CaseType,
  deserialize,
  DocumentObject,
  transform,
} from 'jsonapi-fractal';
import ItemListItem from '../../model/ItemListItem';
import ItemListItemTransformer from '../transformers/ItemListItemTransformer';

interface tourItemParams {
  tourId: number;
  entry: ItemListItem;
}

export const fetchTourItem = async (
  tourId: number,
  id: number,
): Promise<ItemListItem> => {
  const response = await adapter().get(`/api/tours/${tourId}/items/${id}`);
  const entry = deserialize(response.data, {
    changeCase: CaseType.camelCase,
  }) as ItemListItem;
  return entry;
};

type ItemListItems = ReadonlyArray<ItemListItem>;

export const fetchTourItems = async (
  tourId: number,
): Promise<ItemListItems> => {
  const response = await adapter().get(`/api/tours/${tourId}/items`);
  const data = deserialize(response.data, {
    changeCase: CaseType.camelCase,
  }) as ItemListItem[];
  return data.map((entry: ItemListItem) => {
    return entry;
  });
};

export const createOrUpdateTourItem = async (params: tourItemParams) => {
  const { tourId, entry } = params;
  const serializedData = transform()
    .withInput(entry)
    .withTransformer(new ItemListItemTransformer())
    .withOptions({ changeCase: CaseType.kebabCase })
    .serialize();

  let response = { data: undefined };

  if (entry.id) {
    response = await updateTourItem(tourId, entry, serializedData);
  } else {
    response = await createTourItem(tourId, serializedData);
  }

  const data = response.data;

  return data ? (deserialize(data) as ItemListItem) : undefined;
};

const updateTourItem = async (
  tourId: number,
  entry: ItemListItem,
  serializedData: DocumentObject,
) => {
  return adapter().patch(
    `/api/tours/${tourId}/items/${entry.id}`,
    serializedData,
  );
};

const createTourItem = async (
  tourId: number,
  serializedData: DocumentObject,
) => {
  return adapter().post(`/api/tours/${tourId}/items`, serializedData);
};

export const deleteTourItem = async (
  params: tourItemParams,
): Promise<ItemListItem> => {
  const { tourId, entry } = params;
  const response = await adapter().delete(
    `/api/tours/${tourId}/items/${entry.id}`,
  );
  return response.data;
};
