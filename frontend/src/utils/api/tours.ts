import {
  CaseType,
  deserialize,
  DocumentObject,
  transform,
} from 'jsonapi-fractal';
import { SportKind } from '../../model/SportKind';
import Tour from '../../model/Tour';
import TourTransformer from '../transformers/TourTransformer';
import adapter from './axios';

const convertDates = (entry: Tour) => {
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

export const fetchTour = async (id: number): Promise<Tour> => {
  const response = await adapter().get(`/api/tours/${id}`);
  const entry = deserialize(response.data, {
    changeCase: CaseType.camelCase,
  }) as Tour;
  convertDates(entry);
  return entry;
};

export const createOrUpdateTour = async (entry: Tour) => {
  const serializedData = transform()
    .withInput(entry)
    .withTransformer(new TourTransformer())
    .withOptions({ changeCase: CaseType.kebabCase })
    .serialize();

  let response = { data: undefined };

  if (entry.id) {
    response = await updateTour(entry, serializedData);
  } else {
    response = await createTour(entry, serializedData);
  }

  const data = response.data;

  return data ? (deserialize(data) as Tour) : undefined;
};

const updateTour = async (entry: Tour, serializedData: DocumentObject) => {
  return adapter().patch(`/api/tours/${entry.id}`, serializedData);
};

const createTour = async (entry: Tour, serializedData: DocumentObject) => {
  return adapter().post('/api/tours', serializedData);
};

type Tours = ReadonlyArray<Tour>;

export const fetchTours = async (sportKind: SportKind): Promise<Tours> => {
  const response = await adapter().get('/api/tours', {
    params: { filter: { sport_kind: sportKind } },
  });
  if (!response) return [];

  const data = deserialize(response.data, {
    changeCase: CaseType.camelCase,
  }) as Tour[];
  return data.map((entry: Tour) => {
    convertDates(entry);
    return entry;
  });
};

type CreateTourItemListParams = {
  template_item_list_id?: number;
};

export const createTourItemList = async (
  templateItemListId: number | undefined,
  entryId: number,
): Promise<null> => {
  const params: CreateTourItemListParams = {};
  if (templateItemListId) {
    params.template_item_list_id = templateItemListId;
  }
  await adapter().post(`/api/tours/${entryId}/item_list`, {
    params: params,
  });

  return null;
};
