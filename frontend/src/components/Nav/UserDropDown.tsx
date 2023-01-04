import { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../utils/providers/CurrentUserContext';
import { logout } from '../../utils/services/authentication';

function UserDropDown() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const userLogout = () => {
    logout();
    setCurrentUser({});
    navigate('/login');
  };

  if (!currentUser.token) return null;

  return (
    <Dropdown align='end'>
      <Dropdown.Toggle id='dropdown-basic'>
        {currentUser.firstName}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => userLogout()}>
          {t('logout', { keyPrefix: 'login' })}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropDown;
