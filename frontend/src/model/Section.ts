import Tour from './Tour';

export const SectionTypes = [
  'Section::Transport',
  'Section::Lodging',
  'Section::Meal',
  'Section::stage',
] as const;
export type SectionType = typeof SectionTypes[number];

type Section = {
  id?: number;
  type?: SectionType;
  tour?: Tour;
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
  tourId?: number;
};

export default Section;
