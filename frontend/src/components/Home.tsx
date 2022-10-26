import React from 'react';
import { useTranslation } from 'react-i18next';
import { SportKind, SportKinds } from '../model/SportKind';
import {
  Link,
} from "react-router-dom";

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

function SportKindCube(sportKind: SportKind) {
  const { t, i18n } = useTranslation();
  return (
    <Link to='tours'>
      <div>
        {t(sportKind.toString(), { keyPrefix: 'sport_kinds'})}
      </div>
    </Link>
  )
}

function t() {
}
