import { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SportKind, SportKinds } from '../../model/SportKind';
import SportKindContext from '../../utils/providers/SportKindContext';

function SportKindSelector() {
  const { sportKind, setSportKind } = useContext(SportKindContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  function switchSportKind(kind: SportKind) {
    setSportKind(kind);
    navigate('/tours');
  }

  const items = SportKinds.map((kind) => (
    <Dropdown.Item
      onClick={() => switchSportKind(kind)}
      key={kind.toString()}
      active={sportKind === kind}
    >
      {t(kind.toString(), { keyPrefix: 'sport_kinds' })}
    </Dropdown.Item>
  ));

  return (
    <Dropdown className='me-2'>
      <Dropdown.Toggle variant='outline-light' id='dropdown-basic'>
        {t(sportKind.toString(), { keyPrefix: 'sport_kinds' })}
      </Dropdown.Toggle>

      <Dropdown.Menu>{items}</Dropdown.Menu>
    </Dropdown>
  );
}

export default SportKindSelector;
