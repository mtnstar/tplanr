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
  createdAt?: Date;
  updatedAt?: Date;
  avatar?: TourAvatar;
  startAt?: Date;
  endAt?: Date;
};

export default Tour;
