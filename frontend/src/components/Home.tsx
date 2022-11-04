import React from 'react';
import { useTranslation } from 'react-i18next';
import { SportKind, SportKinds } from '../model/SportKind';
import {
  Link,
} from "react-router-dom";
import SportKindContext from '../utils/providers/SportKindContext';

export default function Home() {
  const { t, i18n } = useTranslation();
  const sportKindCubes = SportKinds.map((kind) =>
    SportKindCube(kind));
  return (
    <>
      <h1>
      {t('home.select_sportkind', { keyPrefix: 'views'})}
      </h1>
      <div>{sportKindCubes}</div>
    </>
  )
}

function SportKindCube(kind: SportKind) {
  const { t, i18n } = useTranslation();
  const { sportKind, setSportKind } = React.useContext(SportKindContext);
  return (
    <Link to='tours'
      onClick={() => setSportKind(kind)} key={kind.toString()} >
      <div>
        {t(kind.toString(), { keyPrefix: 'sport_kinds'})}
      </div>
    </Link>
  )
}

function t() {
}
