import React, { Dispatch } from 'react';
import User from '../../model/User';

const CurrentUserContext = React.createContext({
  currentUser: {} as User,
  setCurrentUser: {} as Dispatch<React.SetStateAction<User>>,
});

export default CurrentUserContext;
