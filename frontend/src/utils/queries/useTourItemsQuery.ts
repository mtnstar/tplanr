import { useQuery } from 'react-query';
import { fetchTourItems } from '../api/items';

export const useTourItemsQuery = (tourId: number) =>
  useQuery(['items', tourId], () => fetchTourItems(tourId));
