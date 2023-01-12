import { useQuery } from 'react-query';
import fetchParticipationTourItems from '../api/tourItems';

export const useParticipationTourItemsQuery = (tourParticipationUid: string) =>
  useQuery(['participationTourItems', tourParticipationUid], () =>
    fetchParticipationTourItems(tourParticipationUid),
  );
