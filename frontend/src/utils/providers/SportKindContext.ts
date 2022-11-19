import React, { Dispatch } from 'react';
import { SportKind } from '../../model/SportKind';

const SportKindContext = React.createContext({
  sportKind: {} as SportKind,
  setSportKind: {} as Dispatch<React.SetStateAction<SportKind>>,
});

export default SportKindContext;
