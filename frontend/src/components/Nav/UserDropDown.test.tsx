import { render, screen, waitFor } from '@testing-library/react';
import '../../i18n';
import CurrentUserContext from '../../utils/providers/CurrentUserContext';
import UserDropDown from './UserDropDown';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('Renders user dropdown menu', async () => {
  const setCurrentUser = jest.fn();
  render(
    <CurrentUserContext.Provider
      value={{
        currentUser: { firstName: 'David', token: 'abcd42' },
        setCurrentUser: setCurrentUser,
      }}
    >
      <UserDropDown />
    </CurrentUserContext.Provider>,
  );

  expect(await screen.findByText('David')).toBeInTheDocument();
});

test('Does not render user dropdown menu if not logged in', async () => {
  const setCurrentUser = jest.fn();
  render(
    <CurrentUserContext.Provider
      value={{
        currentUser: {},
        setCurrentUser: setCurrentUser,
      }}
    >
      <UserDropDown />
    </CurrentUserContext.Provider>,
  );

  expect(screen.queryByText('David')).not.toBeInTheDocument();
});
