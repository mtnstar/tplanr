import { Field, Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Tour from '../../model/Tour';
import { updateTour } from '../../utils/api/tours';
import { toBase64 } from '../../utils/tools/toBase64';

interface FormParams {
  entry: Tour;
}

function TourForm(props: FormParams) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { entry } = props;

  const mutation = useMutation(updateTour, {
    onSuccess: () => {
      navigate(`/tours/${entry.id}`);
    },
  });

  function onFormSubmit(id: number | undefined, tour: Tour) {
    if (id) {
      tour.id = Number(id);
      mutation.mutate(tour);
    } else {
    }
  }

  const TourSchema = Yup.object().shape({
    label: Yup.string()
      .min(2, t('too_short', { keyPrefix: 'global.form' }))
      .max(50, t('too_long', { keyPrefix: 'global.form' }))
      .required(t('required', { keyPrefix: 'global.form' })),
  });

  return (
    <div className='form-wrapper'>
      <Formik
        initialValues={{
          ...entry,
        }}
        onSubmit={async (values) => {
          const tour = {
            ...values,
          };
          onFormSubmit(tour.id, tour);
        }}
        validationSchema={TourSchema}
      >
        {({ handleSubmit, setFieldValue, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='label' className='form-label'>
                {t('label', { keyPrefix: 'tour.attrs' })}
              </label>
              <Field
                as={Form.Control}
                id='label'
                name='label'
                className='form-control w-50'
                required
                isInvalid={!!touched.label && !!errors.label}
              />
              {touched.label && errors.label && (
                <div className='invalid-feedback'>{errors.label}</div>
              )}
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

            <div className='mb-3'>
              <label htmlFor='avatar'>File upload</label>
              <input
                id='avatar'
                name='avatar'
                type='file'
                onChange={(event) => {
                  const file =
                    event.currentTarget.files && event.currentTarget.files[0];
                  if (!file) return;
                  //reader.onloadend = () => {
                  //setFile(file);
                  //setSize(file.size);
                  //setName(file.name);
                  //setImagePreview(reader.result);
                  //};
                  toBase64(file).then((value) => {
                    setFieldValue('avatar', value);
                  });
                }}
                className='form-control w-50'
              />
            </div>

            <button className='btn btn-primary' type='submit'>
              {t('save', { keyPrefix: 'global.actions' })}
            </button>
            <Link className='ms-3' to={`/tours/${entry.id}`}>
              {t('abort', { keyPrefix: 'global.actions' })}
            </Link>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default TourForm;
