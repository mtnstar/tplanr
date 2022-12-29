import { useQuery } from 'react-query';
import TourItem from '../../model/TourItem';
import { fetchTourItem } from '../api/tour_items';

export const useTourItemQuery = (tourId: number, id: number) =>
  useQuery<TourItem>(['tour-items', id], () => fetchTourItem(tourId, id));
