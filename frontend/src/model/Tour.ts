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
  created_at?: Date;
  updated_at?: Date;
  avatar?: TourAvatar;
};

export default Tour;
