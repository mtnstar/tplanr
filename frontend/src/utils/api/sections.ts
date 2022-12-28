import Section from '../../model/Section';
import { adapter } from './axios';
import {
  CaseType,
  deserialize,
  DocumentObject,
  transform,
} from 'jsonapi-fractal';
import SectionTransformer from '../transformers/SectionTransformer';

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

export const fetchSection = async (
  tourId: number,
  id: number,
): Promise<Section> => {
  const response = await adapter.get(`/api/tours/${tourId}/sections/${id}`);
  const entry = deserialize(response.data, {
    changeCase: CaseType.camelCase,
  }) as Section;
  convertDates(entry);
  entry.tourId = tourId;
  return entry;
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

export const createOrUpdateSection = async (entry: Section) => {
  const serializedData = transform()
    .withInput(entry)
    .withTransformer(new SectionTransformer())
    .withOptions({ changeCase: CaseType.kebabCase })
    .serialize();

  let response = { data: undefined };

  if (entry.id) {
    response = await updateSection(entry, serializedData);
  } else {
    response = await createSection(entry, serializedData);
  }

  const data = response.data;

  return data ? (deserialize(data) as Section) : undefined;
};

const updateSection = async (
  entry: Section,
  serializedData: DocumentObject,
) => {
  return adapter.patch(
    `/api/tours/${entry.tourId}/sections/${entry.id}`,
    serializedData,
  );
};

const createSection = async (
  entry: Section,
  serializedData: DocumentObject,
) => {
  return adapter.post(`/api/tours/${entry.tourId}/sections`, serializedData);
};

export const deleteSection = async (entry: Section): Promise<Section> => {
  const response = await adapter.delete(
    `/api/tours/${entry.tourId}/sections/${entry.id}`,
  );
  return response.data;
};
