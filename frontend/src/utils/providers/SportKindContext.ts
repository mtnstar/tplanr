import React from 'react';
import { Dispatch } from 'react';
import { SportKind, SportKinds } from '../../model/SportKind';


const SportKindContext = React.createContext({
  sportKind: {} as SportKind,
  setSportKind: {} as Dispatch<React.SetStateAction<SportKind>>
});

export default SportKindContext;
