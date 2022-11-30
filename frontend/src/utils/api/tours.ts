import { deserialize, transform } from 'jsonapi-fractal';
import { SportKind } from '../../model/SportKind';
import Tour from '../../model/Tour';
import TourTransformer from '../transformers/TourTransformer';
import { adapter } from './axios';

export const fetchTour = async (id: number): Promise<Tour> => {
  const response = await adapter.get(`/api/tours/${id}`);
  const entry = deserialize(response.data) as Tour;
  return entry;
};

export const updateTour = async (entry: Tour) => {
  const serializedData = transform()
    .withInput(entry)
    .withTransformer(new TourTransformer())
    .serialize();

  const { data: response } = await adapter.patch(
    `/api/tours/${entry.id}`,
    serializedData,
  );
  return response.data;
};

type Tours = ReadonlyArray<Tour>;

export const fetchTours = async (sportKind: SportKind): Promise<Tours> => {
  const response = await adapter.get('/api/tours', {
    params: { filter: { sport_kind: sportKind } },
  });
  const data = deserialize(response.data) as any;
  return data.map((entry: any) => entry as Tour);
};
