import axios from 'axios';
import { deserialize, transform } from 'jsonapi-fractal';
import { useQuery } from 'react-query';
import Tour from '../../model/Tour';
import TourTransformer from '../transformers/TourTransformer';

const fetchTour = async (id: number): Promise<Tour> => {
  const response = await axios.get(`/api/tours/${id}`);
  const data = deserialize(response.data) as Tour;
  return data;
};

export const useTourQuery = (id: number) =>
  useQuery<Tour>(['tours', id], () => fetchTour(id));

export const updateTour = async (data: Tour) => {
  const serializedData = transform()
    .withInput(data)
    .withTransformer(new TourTransformer())
    .serialize();

  const adapter = axios.create({
    headers: {
      'Content-Type': 'application/vnd.api+json',
    },
  });

  const { data: response } = await adapter.patch(
    `/api/tours/${data.id}`,
    serializedData,
  );
  return response.data;
};
