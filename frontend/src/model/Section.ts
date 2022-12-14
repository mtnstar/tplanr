import Tour from './Tour';

type Section = {
  id?: number;
  type: string;
  tour: Tour;
  label?: string;
  details?: string;
  external_link?: string;
  distance_km?: number;
  climb_up_meters?: number;
  climb_down_meters?: number;
  createdAt?: Date;
  updatedAt?: Date;
  startAt?: Date;
  endAt?: Date;
};

export default Section;
