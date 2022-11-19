import axios from 'axios';
import { deserialize } from 'jsonapi-fractal';
import { useQuery } from 'react-query';
import Tour from '../../model/Tour';
import { serialize } from 'jsonapi-fractal';

const fetchTour = async (id: number): Promise<Tour> => {
  const response = await axios.get(`/api/tours/${id}`);
  const data = deserialize(response.data) as Tour;
  return data;
};

export const useTourQuery = (id: number) =>
  useQuery<Tour>(['tours', id], () => fetchTour(id));

export const updateTour = async (id: number, data: Tour) => {
  const serializedData = serialize(data, 'tours');
  const adapter = axios.create({
    headers: {
      'Content-Type': 'application/vnd.api+json',
    },
  });

  const { data: response } = await adapter.patch(
    `/api/tours/${id}`,
    serializedData,
  );
  return response.data;
};
