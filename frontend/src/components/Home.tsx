import React from 'react';
import { useTranslation } from 'react-i18next';
import { SportKind, SportKinds } from '../model/SportKind';
import { Link } from 'react-router-dom';
import SportKindContext from '../utils/providers/SportKindContext';

export default function Home() {
  const { t } = useTranslation();
  const sportKindCubes = SportKinds.map((kind) => SportKindCube(kind));
  return (
    <>
      <h1>{t('home.select_sportkind', { keyPrefix: 'views' })}</h1>
      <div className='container px-4 text-center'>
        <div className='row gx-5'>{sportKindCubes}</div>
      </div>
    </>
  );
}

function SportKindCube(kind: SportKind) {
  const { t } = useTranslation();
  const { setSportKind } = React.useContext(SportKindContext);
  const imgLink = `/icons/${kind.toString()}.svg`;
  return (
    <div className='col' key={kind.toString()}>
      <div className='p-3 border bg-light'>
        <Link
          to='tours'
          onClick={() => setSportKind(kind)}
          key={kind.toString()}
        >
          <img
            alt={t(kind.toString(), { keyPrefix: 'sport_kinds' })}
            src={imgLink}
          />
          <div>{t(kind.toString(), { keyPrefix: 'sport_kinds' })}</div>
        </Link>
      </div>
    </div>
  );
}
