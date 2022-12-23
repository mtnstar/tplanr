import { Field, Formik, FormikErrors, FormikTouched } from 'formik';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import Section from '../../model/Section';
import { createOrUpdateSection } from '../../utils/api/sections';
import * as Yup from 'yup';
import DateRangePickerField from '../Shared/DateRangePickerField';
import { Dispatch, SetStateAction } from 'react';
import { useSectionQuery } from '../../utils/queries/useSectionQuery';

interface FormParams {
  sectionId: number | undefined;
  setEdit: Dispatch<SetStateAction<boolean>>;
}

function SectionForm(props: FormParams) {
  const { t } = useTranslation();
  const { id: tourId } = useParams();
  const { sectionId, setEdit } = props;
  const { data: entry } = useSectionQuery(Number(tourId), Number(sectionId));

  const mutation = useMutation(createOrUpdateSection, {
    onSuccess: (data) => {
      if (data) {
        setEdit(false);
      }
    },
  });

  if (!entry) return null;

  function onFormSubmit(id: number | undefined, section: Section) {
    section.id = id;
    //if (!id) tour.sport_kind = sportKind;
    // we only care about the date here, not the time.
    // so always use UTC date
    //tour.startAt = convertLocalToUTCDate(tour.startAt!);
    //tour.endAt = convertLocalToUTCDate(tour.endAt!);

    mutation.mutate(section);
  }

  const SectionSchema = Yup.object().shape({
    label: Yup.string()
      .min(2, t('too_short', { keyPrefix: 'global.form' }))
      .max(50, t('too_long', { keyPrefix: 'global.form' }))
      .required(t('required', { keyPrefix: 'global.form' })),
    startAt: Yup.string()
      .required(t('required', { keyPrefix: 'global.form' }))
      .nullable(true),
    endAt: Yup.string().required(t('required', { keyPrefix: 'global.form' })),
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
                {t('startAtEndAt', { keyPrefix: 'section.attrs' })}
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

            <button className='btn btn-primary' type='submit'>
              {t('save', { keyPrefix: 'global.actions' })}
            </button>
            <button className='ms-3' onClick={() => setEdit(false)}>
              {t('abort', { keyPrefix: 'global.actions' })}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default SectionForm;
