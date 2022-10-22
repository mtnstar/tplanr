import React from 'react';
import { SportKinds, SportKind } from '../../model/SportKind';

function useSportKind() {
  return React.useState<SportKind>(SportKinds[0]);
}

export default useSportKind;
