import { Link, useParams } from 'react-router-dom';
import { useTourQuery } from '../../utils/queries/useTourQuery';
import { useTranslation } from 'react-i18next';

export default function TourShow() {
  return (
    <>
      <TourEntry />
    </>
  );
}

function TourEntry() {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data } = useTourQuery(+id!);

  // const { isLoading, error, data } = useQuery('repoData', () =>
  // fetch('/api/tours').then(res =>
  // res.json()
  // )
  // )

  if (!data) return null;

  // if (error) return null;

  // const items: string[] = entries.map((entry: SportKind) => entry.label);
  //

  return (
    <>
      {data.avatar && <img src={data.avatar.thumb.url} alt='Tour Avatar' />}
      <div>{data.label}</div>
      <div>{data.description}</div>
      <Link to={`/tours/${data.id}/edit`}>
        <button className='btn btn-primary' type='button'>
          {t('edit', { keyPrefix: 'global.actions' })}
        </button>
      </Link>
    </>
  );
}
