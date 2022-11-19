import { SportKind } from './SportKind';

type Tour = {
  id: number;
  sport_kind: SportKind;
  description: string;
  label: string;
  created_at: Date;
  updated_at: Date;
};

export default Tour;
