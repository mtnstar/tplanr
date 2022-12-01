import { deserialize, DocumentObject, transform } from 'jsonapi-fractal';
import { SportKind } from '../../model/SportKind';
import Tour from '../../model/Tour';
import TourTransformer from '../transformers/TourTransformer';
import { adapter } from './axios';

export const fetchTour = async (id: number): Promise<Tour> => {
  const response = await adapter.get(`/api/tours/${id}`);
  const entry = deserialize(response.data) as Tour;
  return entry;
};

export const createOrUpdateTour = async (entry: Tour) => {
  const serializedData = transform()
    .withInput(entry)
    .withTransformer(new TourTransformer())
    .serialize();

  let response = { data: undefined };

  if (entry.id) {
    response = await updateTour(entry, serializedData);
  } else {
    response = await createTour(entry, serializedData);
  }

  const data = response.data;

  return data ? (deserialize(data) as Tour) : undefined;
};

const updateTour = async (entry: Tour, serializedData: DocumentObject) => {
  return adapter.patch(`/api/tours/${entry.id}`, serializedData);
};

const createTour = async (entry: Tour, serializedData: DocumentObject) => {
  return adapter.post('/api/tours', serializedData);
};

type Tours = ReadonlyArray<Tour>;

export const fetchTours = async (sportKind: SportKind): Promise<Tours> => {
  const response = await adapter.get('/api/tours', {
    params: { filter: { sport_kind: sportKind } },
  });
  const data = deserialize(response.data) as any;
  return data.map((entry: any) => entry as Tour);
};
