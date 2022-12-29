import { Field, Formik, FormikErrors, FormikTouched } from 'formik';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { queryClient } from '../../../index';
import TourItem from '../../../model/TourItem';
import { createOrUpdateTourItem } from '../../../utils/api/tour_items';

interface FormParams {
  entry: TourItem;
  closeForm: () => void;
}

function TourItemForm(props: FormParams) {
  const { t } = useTranslation();
  const { id: tourId } = useParams();
  const { entry, closeForm } = props;

  const createOrUpdate = useMutation(createOrUpdateTourItem, {
    onSuccess: (data) => {
      if (data) {
        closeForm();
        queryClient.invalidateQueries({
          queryKey: ['tour-items', Number(tourId)],
        });
      }
    },
  });

  if (!entry) return null;

  function onFormSubmit(id: number | undefined, tourItem: TourItem) {
    tourItem.id = id;
    if (!id && tourId) tourItem.tourId = Number(tourId);

    createOrUpdate.mutate(tourItem);
  }

  const TourItemSchema = Yup.object().shape({
    count: Yup.number().required(t('required', { keyPrefix: 'global.form' })),
  });

  return (
    <div className='form-wrapper'>
      <Formik
        initialValues={{
          ...entry,
        }}
        onSubmit={async (values) => {
          const section = {
            ...values,
          };
          onFormSubmit(section.id, section);
        }}
        validationSchema={TourItemSchema}
      >
        {({ handleSubmit, setFieldValue, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <label htmlFor='count' className='form-label'>
              {t('count', { keyPrefix: 'item.attrs' })}
            </label>
            <Field
              as={Form.Control}
              id='count'
              name='count'
              className='form-control w-50'
              required
              isInvalid={!!touched.count && !!errors.count}
            />
            {touched.count && errors.count && (
              <div className='invalid-feedback'>{errors.count}</div>
            )}

            <button className='btn btn-primary' type='submit'>
              {entry.id
                ? t('save', { keyPrefix: 'global.actions' })
                : t('add', { keyPrefix: 'global.actions' })}
            </button>
            <button className='btn btn-link' onClick={() => closeForm()}>
              {t('abort', { keyPrefix: 'global.actions' })}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default TourItemForm;
