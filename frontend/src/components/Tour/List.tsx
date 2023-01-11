import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import SportKindContext from '../../utils/providers/SportKindContext';
import { useToursQuery } from '../../utils/queries/useToursQuery';
import Table from 'react-bootstrap/Table';
import Tour from '../../model/Tour';
import { queryClient } from '../../App';
import { deleteTour } from '../../utils/api/tours';
import { useMutation } from 'react-query';
import { Button } from 'react-bootstrap';

export default function ToursList() {
  const { t } = useTranslation();
  return (
    <>
      <Link className='btn btn-primary' to={'/tours/new'}>
        {t('new', { keyPrefix: 'tour' })}
      </Link>
      <ToursTable />
    </>
  );
}

interface TourRowProps {
  tour: Tour;
}

function TourRow(props: TourRowProps) {
  const { tour } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { sportKind } = useContext(SportKindContext);

  function showTour(tour: Tour) {
    navigate(`/tours/${tour.id}`);
  }

  const deleteTourMutation = useMutation(deleteTour, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['tours', sportKind],
      });
    },
  });

  const deleteTourEntry = (entryId: number) => {
    deleteTourMutation.mutate(entryId);
  };

  return (
    <tr onClick={() => showTour(tour)} key={tour.id}>
      <td>
        {tour.avatar && (
          <img
            src={tour.avatar.thumb.url}
            className='img-thumbnail'
            alt='Tour Avatar'
          />
        )}
      </td>
      <td>{tour.label}</td>
      <td>{tour.description}</td>
      <td>
        {tour.startAt &&
          t('startAtEndAt', {
            startAt: tour.startAt,
            endAt: tour.endAt,
            keyPrefix: 'tour',
          })}
      </td>
      <td onClick={(event) => event.stopPropagation()}>
        <div className='d-flex justify-content-between'>
          <div></div>
          <Button
            variant='outline-danger'
            size='sm'
            onClick={() => deleteTourEntry(Number(tour.id))}
          >
            <Icon.Trash />
          </Button>
        </div>
      </td>
    </tr>
  );
}

function ToursTable() {
  const { sportKind } = useContext(SportKindContext);
  const { data } = useToursQuery(sportKind);
  const { t } = useTranslation();

  if (!data || data.length === 0) {
    return <p>{t('global.no_entries')}</p>;
  }

  const rows = data.map((tour: Tour) => <TourRow key={tour.id} tour={tour} />);

  return (
    <Table striped hover className='tours align-middle'>
      <thead>
        <tr>
          <th></th>
          <th>{t('label', { keyPrefix: 'tour.attrs' })}</th>
          <th>{t('description', { keyPrefix: 'tour.attrs' })}</th>
          <th>{t('time_period', { keyPrefix: 'tour.attrs' })}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
