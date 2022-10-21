import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { SportKind } from '../../model/sport_kind';

function Items() {
  const { t, i18n } = useTranslation();
  const items = SportKind.all.map((kind) =>
    <Dropdown.Item href="#/action-1" key={kind.toString()}>
      {t(kind.toString(), { keyPrefix: 'sport_kinds'})}
    </Dropdown.Item>
  );
  return items;
}

function SportKindSelector() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {Items()}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SportKindSelector;
