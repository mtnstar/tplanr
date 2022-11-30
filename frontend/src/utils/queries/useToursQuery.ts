import { useQuery } from 'react-query';
import { SportKind } from '../../model/SportKind';
import { fetchTours } from '../api/tours';

export const useToursQuery = (sportKind: SportKind) =>
  useQuery(['tours', sportKind], () => fetchTours(sportKind));
