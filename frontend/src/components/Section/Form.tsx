import { Field, Formik, FormikErrors, FormikTouched } from 'formik';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import Section from '../../model/Section';
import { createOrUpdateSection } from '../../utils/api/sections';
import * as Yup from 'yup';
import DateTimeRangePickerField from '../Shared/DateTimePickerField';
import { useTourQuery } from '../../utils/queries/useTourQuery';
import { queryClient } from '../../App';

interface FormParams {
  entry: Section;
  closeForm: () => void;
}

function SectionForm(props: FormParams) {
  const { t } = useTranslation();
  const { id: tourId } = useParams();
  const { entry, closeForm } = props;
  const { data: tour } = useTourQuery(+tourId!);

  const createOrUpdate = useMutation(createOrUpdateSection, {
    onSuccess: (data) => {
      if (data) {
        closeForm();
        queryClient.invalidateQueries({
          queryKey: ['sections', Number(tourId)],
        });
      }
    },
  });

  if (!entry) return null;

  function onFormSubmit(id: number | undefined, section: Section) {
    section.id = id;
    if (!id && tourId) section.tourId = Number(tourId);

    createOrUpdate.mutate(section);
  }

  const SectionSchema = Yup.object().shape({
    label: Yup.string()
      .min(2, t('too_short', { keyPrefix: 'global.form' }))
      .max(50, t('too_long', { keyPrefix: 'global.form' }))
      .required(t('required', { keyPrefix: 'global.form' })),
    startAt: Yup.date()
      .required(t('required', { keyPrefix: 'global.form' }))
      .nullable(true),
    endAt: Yup.date().required(t('required', { keyPrefix: 'global.form' })),
  });

  const isStartAtEndAtInvalid = (
    touched: FormikTouched<Section>,
    errors: FormikErrors<Section>,
  ) => (touched.startAt && errors.startAt) || (touched.endAt && errors.endAt);

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
        validationSchema={SectionSchema}
      >
        {({ handleSubmit, setFieldValue, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='label' className='form-label'>
                {t('label', { keyPrefix: 'section.attrs' })}
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
              <label htmlFor='details' className='form-label'>
                {t('details', { keyPrefix: 'section.attrs' })}
              </label>
              <Field
                component='textarea'
                rows='4'
                id='details'
                name='details'
                className='form-control w-50'
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='startAt' className='form-label'>
                {t('startAt', { keyPrefix: 'section.attrs' })}
              </label>
              <DateTimeRangePickerField
                name='startAt'
                minDate={tour && tour.startAt}
                maxDate={tour && tour.endAt}
                isInvalid={!!touched.startAt && !!errors.startAt}
              />
              {touched.startAt && errors.startAt && (
                <div className='invalid-feedback'>{errors.startAt}</div>
              )}
            </div>

            <div className='mb-3'>
              <label htmlFor='endAt' className='form-label'>
                {t('endAt', { keyPrefix: 'section.attrs' })}
              </label>
              <DateTimeRangePickerField
                name='endAt'
                minDate={tour && tour.startAt}
                maxDate={tour && tour.endAt}
                isInvalid={!!touched.endAt && !!errors.endAt}
              />
              {touched.endAt && errors.endAt && (
                <div className='invalid-feedback'>{errors.endAt}</div>
              )}
            </div>

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

export default SectionForm;
