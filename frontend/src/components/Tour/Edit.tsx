import { Field, Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';
import { updateTour, useTourQuery } from '../../utils/queries/useTourQuery';
import Tour from '../../model/Tour';

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
        <label htmlFor='label'>First Name</label>
        <Field id='label' name='label' className='form-control' />

        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
}

export default TourEdit;
