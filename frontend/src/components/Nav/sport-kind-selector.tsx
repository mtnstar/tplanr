import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { SportKinds, SportKind } from '../../model/sport-kind';

// function Items() {
  // const { t, i18n } = useTranslation();
  // const items = SportKinds.map((kind) =>
    // <Dropdown.Item onClick={onSwitchSportKind(kind)} key={kind.toString()}>
      // {t(kind.toString(), { keyPrefix: 'sport_kinds'})}
    // </Dropdown.Item>
  // );
  // return items;
// }

interface SportKindSelectorProps {
  sportKind: SportKind;
  onSwitchSportKind: any;
}

function SportKindSelector({sportKind, onSwitchSportKind}: SportKindSelectorProps) {
  const { t, i18n } = useTranslation();
  const items = SportKinds.map((kind) =>
    <Dropdown.Item onClick={() => onSwitchSportKind(kind)} key={kind.toString()}>
      {t(kind.toString(), { keyPrefix: 'sport_kinds'})}
    </Dropdown.Item>
  );

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        {t(sportKind.toString(), { keyPrefix: 'sport_kinds'})}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SportKindSelector;
