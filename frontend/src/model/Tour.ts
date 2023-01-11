import { SportKind } from './SportKind';

type TourAvatar = {
  url: string;
  thumb: {
    url: string;
  };
};

type Tour = {
  id?: number;
  sport_kind?: SportKind;
  description?: string;
  label?: string;
  participationUid?: string;
  createdAt?: Date;
  updatedAt?: Date;
  avatar?: TourAvatar;
  startAt?: Date;
  endAt?: Date;
  itemListId?: number;
};

export default Tour;
