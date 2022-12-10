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
      <Link to={`/tours/${data.id}/edit`}>
        <button className='btn btn-primary' type='button'>
          {t('edit', { keyPrefix: 'global.actions' })}
        </button>
      </Link>
      <div className='container mt-4'>
        <div className='row'>
          <div className='col-8'>
            <dl>
              <dt>{t('label', { keyPrefix: 'tour.attrs' })}</dt>
              <dd>
                <div>{data.label}</div>
              </dd>
              <dt>{t('description', { keyPrefix: 'tour.attrs' })}</dt>
              <dd>
                <div>{data.description}</div>
              </dd>
              <dt>{t('time_period', { keyPrefix: 'tour.attrs' })}</dt>
              <dd>
                <div>
                  {data.startAt &&
                    t('startAtEndAt', {
                      startAt: data.startAt,
                      endAt: data.endAt,
                      keyPrefix: 'tour.attrs',
                    })}
                </div>
              </dd>
            </dl>
          </div>
          <div className='col-4'>
            {data.avatar && (
              <img
                src={data.avatar.url}
                className='rounded float-end img-fluid'
                alt='Tour Avatar'
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
