import { useQuery } from 'react-query';
import { fetchTourItems } from '../api/tour_items';

export const useTourItemsQuery = (tourId: number) =>
  useQuery(['tourItems', tourId], () => fetchTourItems(tourId));
