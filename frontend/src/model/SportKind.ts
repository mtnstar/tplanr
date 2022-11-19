export const SportKinds = [
  'alpine_summer',
  'climbing',
  'ski_tour',
  'mountain_bike',
] as const;
export type SportKind = typeof SportKinds[number];
