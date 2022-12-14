import { CaseType, deserialize } from 'jsonapi-fractal';
import Section from '../../model/Section';
import { adapter } from './axios';

const convertDates = (entry: Section) => {
  if (entry.startAt) {
    entry.startAt = new Date(entry.startAt);
  }
  if (entry.endAt) {
    entry.endAt = new Date(entry.endAt);
  }
  if (entry.createdAt) {
    entry.createdAt = new Date(entry.createdAt);
  }
  if (entry.updatedAt) {
    entry.updatedAt = new Date(entry.updatedAt);
  }
};

type Sections = ReadonlyArray<Section>;

export const fetchSections = async (tourId: number): Promise<Sections> => {
  const response = await adapter.get(`/api/tours/${tourId}/sections`);
  const data = deserialize(response.data, {
    changeCase: CaseType.camelCase,
  }) as Section[];
  return data.map((entry: Section) => {
    convertDates(entry);
    return entry;
  });
};
