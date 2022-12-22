import Tour from './Tour';

type Section = {
  id?: number;
  type: string;
  tour: Tour;
  label?: string;
  details?: string;
  externalLink?: string;
  distanceKm?: number;
  climbUpMeters?: number;
  climbDownMeters?: number;
  createdAt?: Date;
  updatedAt?: Date;
  startAt?: Date;
  endAt?: Date;
};

export default Section;
