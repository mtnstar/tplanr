import { useQuery } from 'react-query';
import Tour from '../../model/Tour';
import { fetchTour } from '../api/tours';

export const useTourQuery = (id: number) =>
  useQuery<Tour>(['tours', id], () => fetchTour(id));
