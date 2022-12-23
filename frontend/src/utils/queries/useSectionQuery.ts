import { useQuery } from 'react-query';
import Section from '../../model/Section';
import { fetchSection } from '../api/sections';

export const useSectionQuery = (tourId: number, id: number) =>
  useQuery<Section>(['sections', id], () => fetchSection(tourId, id));
