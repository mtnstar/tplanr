import { Field, Formik } from 'formik';
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

  if (!data) return null;

  const toBase64 = (file: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

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
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
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

          <div className='form-group'>
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
                  formik.setFieldValue('avatar', value);
                });
              }}
              className='form-control'
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-primary' type='submit'>
              {t('save', { keyPrefix: 'global.actions' })}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default TourEdit;
