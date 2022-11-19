import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Tour from '../../model/Tour';
import { updateTour, useTourQuery } from '../../utils/queries/useTourQuery';

function TourEdit() {
  return (
    <div className='container'>
      <div className='form-wrapper'>
        <TourForm />
      </div>
    </div>
  );
}

function mutate(id: number, tour: Tour) {
  updateTour(id, tour);
}

function TourForm() {
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
    <Formik
      initialValues={{
        ...data,
      }}
      onSubmit={async (values) => {
        const tour = {
          ...values,
        };
        mutate(Number(id), tour);
      }}
    >
      <Form>
        <div className='mb-3'>
          <label htmlFor='label' className='form-label'>
            {t('label', { keyPrefix: 'tour.attrs' })}
          </label>
          <Field id='label' name='label' className='form-control w-50' />
        </div>

        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            {t('description', { keyPrefix: 'tour.attrs' })}
          </label>
          <Field
            component='textarea'
            rows='4'
            id='description'
            name='description'
            className='form-control w-50'
          />
        </div>

        <button className='btn btn-primary' type='submit'>
          {t('save', { keyPrefix: 'global.actions' })}
        </button>
      </Form>
    </Formik>
  );
}

export default TourEdit;
