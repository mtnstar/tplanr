import Tour from '../../model/Tour';
import { SportKind } from '../../model/SportKind';
import { useQuery } from 'react-query'
import axios from 'axios';
import { deserialize } from 'jsonapi-fractal';

const fetchTour = async (id: number): Promise<Tour> => {
  const response = await axios.get(`/api/tours/${id}`);
  const data = deserialize(response.data) as Tour;
  return data;
}

export const useTourQuery = (id: number) =>
  useQuery(['tours', id], () => fetchTour(id))
