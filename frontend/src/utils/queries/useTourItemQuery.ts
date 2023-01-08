import { useQuery } from 'react-query';
import ItemListItem from '../../model/ItemListItem';
import { fetchTourItem } from '../api/tour_items';

export const useTourItemQuery = (tourId: number, id: number) =>
  useQuery<ItemListItem>(['tour-items', id], () => fetchTourItem(tourId, id));
