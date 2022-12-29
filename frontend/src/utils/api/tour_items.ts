import { adapter } from './axios';
import {
  CaseType,
  deserialize,
  DocumentObject,
  transform,
} from 'jsonapi-fractal';
import TourItem from '../../model/TourItem';
import TourItemTransformer from '../transformers/TourItemTransformer';

export const fetchTourItem = async (
  tourId: number,
  id: number,
): Promise<TourItem> => {
  const response = await adapter.get(`/api/tours/${tourId}/items/${id}`);
  const entry = deserialize(response.data, {
    changeCase: CaseType.camelCase,
  }) as TourItem;
  return entry;
};

type TourItems = ReadonlyArray<TourItem>;

export const fetchTourItems = async (tourId: number): Promise<TourItems> => {
  const response = await adapter.get(`/api/tours/${tourId}/items`);
  const data = deserialize(response.data, {
    changeCase: CaseType.camelCase,
  }) as TourItem[];
  return data.map((entry: TourItem) => {
    return entry;
  });
};

export const createOrUpdateTourItem = async (entry: TourItem) => {
  const serializedData = transform()
    .withInput(entry)
    .withTransformer(new TourItemTransformer())
    .withOptions({ changeCase: CaseType.kebabCase })
    .serialize();

  let response = { data: undefined };

  if (entry.id) {
    response = await updateTourItem(
      Number(entry.tourId),
      entry,
      serializedData,
    );
  } else {
    response = await createTourItem(Number(entry.tourId), serializedData);
  }

  const data = response.data;

  return data ? (deserialize(data) as TourItem) : undefined;
};

const updateTourItem = async (
  tourId: number,
  entry: TourItem,
  serializedData: DocumentObject,
) => {
  return adapter.patch(
    `/api/tours/${tourId}/items/${entry.id}`,
    serializedData,
  );
};

const createTourItem = async (
  tourId: number,
  serializedData: DocumentObject,
) => {
  return adapter.post(`/api/tours/${tourId}/sections`, serializedData);
};

export const deleteSection = async (
  tourId: number,
  entry: TourItem,
): Promise<TourItem> => {
  const response = await adapter.delete(
    `/api/tours/${tourId}/items/${entry.id}`,
  );
  return response.data;
};
