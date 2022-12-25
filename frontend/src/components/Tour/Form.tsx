import React from 'react';
import { Field, Formik, FormikErrors, FormikTouched } from 'formik';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Tour from '../../model/Tour';
import { createOrUpdateTour } from '../../utils/api/tours';
import { toBase64 } from '../../utils/tools/toBase64';
import SportKindContext from '../../utils/providers/SportKindContext';
import DateRangePickerField from '../Shared/DateRangePickerField';

//function convertLocalToUTCDate(date: Date) {
//if (!date) {
//return date;
//}
//date = new Date(date);
//date = new Date(
//Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
//);
//return date;
//}

interface FormParams {
  entry: Tour;
}

function TourForm(props: FormParams) {
  const { sportKind } = React.useContext(SportKindContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { entry } = props;
  const { id } = useParams();

  const mutation = useMutation(createOrUpdateTour, {
    onSuccess: (data) => {
      if (data) {
        navigate(`/tours/${id || data.id}`);
      }
    },
  });

  function onFormSubmit(id: number | undefined, tour: Tour) {
    tour.id = id;
    if (!id) tour.sport_kind = sportKind;
    // we only care about the date here, not the time.
    // so always use UTC date
    //tour.startAt = convertLocalToUTCDate(tour.startAt!);
    //tour.endAt = convertLocalToUTCDate(tour.endAt!);

    mutation.mutate(tour);
  }

  const TourSchema = Yup.object().shape({
    label: Yup.string()
      .min(2, t('too_short', { keyPrefix: 'global.form' }))
      .max(50, t('too_long', { keyPrefix: 'global.form' }))
      .required(t('required', { keyPrefix: 'global.form' })),
    startAt: Yup.string()
      .required(t('required', { keyPrefix: 'global.form' }))
      .nullable(true),
    endAt: Yup.string().required(t('required', { keyPrefix: 'global.form' })),
  });

  const abortLink = entry.id ? `/tours/${entry.id}` : '/tours';

  const isStartAtEndAtInvalid = (
    touched: FormikTouched<Tour>,
    errors: FormikErrors<Tour>,
  ) => (touched.startAt && errors.startAt) || (touched.endAt && errors.endAt);

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
          // do not update avatar if unchanged
          if (tour.avatar === entry.avatar) {
            tour.avatar = undefined;
          }
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
              <label htmlFor='startAt' className='form-label'>
                {t('startAtEndAt', { keyPrefix: 'tour.attrs' })}
              </label>
              <DateRangePickerField
                startName='startAt'
                endName='endAt'
                isInvalid={!!isStartAtEndAtInvalid(touched, errors)}
              />
              {isStartAtEndAtInvalid(touched, errors) && (
                <div className='invalid-feedback' style={{ display: 'block' }}>
                  {errors.startAt || errors.endAt}
                </div>
              )}
            </div>

            <div className='mb-3'>
              <label htmlFor='newAavatar'>File upload</label>
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
              {entry.id
                ? t('save', { keyPrefix: 'global.actions' })
                : t('create', { keyPrefix: 'global.actions' })}
            </button>
            <Link className='ms-3' to={abortLink}>
              {t('abort', { keyPrefix: 'global.actions' })}
            </Link>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default TourForm;
