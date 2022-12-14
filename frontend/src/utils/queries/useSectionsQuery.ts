import { useQuery } from 'react-query';
import { fetchSections } from '../api/sections';

export const useSectionsQuery = (tourId: number) =>
  useQuery(['sections', tourId], () => fetchSections(tourId));
