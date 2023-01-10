import { Field, Form, Formik, FormikProps } from 'formik';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { createTemplateListFromTourList } from '../../utils/api/item_lists';
import { useTourQuery } from '../../utils/queries/useTourQuery';

export default function SaveTourListAsTemplate() {
  const [showForm, setShowForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  return (
    <div className='d-flex justify-content-between mb-3'>
      <div></div>
      {!showForm && !showSuccessMessage && (
        <SaveAsButton setShowForm={setShowForm} />
      )}
      {showForm && (
        <SaveAsTemplateForm
          setShowForm={setShowForm}
          setShowSuccessMessage={setShowSuccessMessage}
        />
      )}
      {showSuccessMessage && <TemplateSavedMessage />}
    </div>
  );
}

interface SaveAsButtonParams {
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

function SaveAsButton(props: SaveAsButtonParams) {
  const { setShowForm } = props;
  const { t } = useTranslation();
  return (
    <>
      <button
        className='btn btn-outline-primary'
        onClick={() => setShowForm(true)}
      >
        {t('saveAsTemplate', { keyPrefix: 'itemList' })}
      </button>
    </>
  );
}

function TemplateSavedMessage() {
  const { t } = useTranslation();
  return (
    <div>
      {t('templateSavedSuccess', { keyPrefix: 'itemList' })}
      <Link to='/item_lists'>{t('templates', { keyPrefix: 'itemList' })}</Link>
    </div>
  );
}

interface SaveAsTemplateFormParams {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setShowSuccessMessage: Dispatch<SetStateAction<boolean>>;
}

function SaveAsTemplateForm(props: SaveAsTemplateFormParams) {
  const { setShowForm, setShowSuccessMessage } = props;
  const { t } = useTranslation();
  const { id: tourId } = useParams();
  const { data: tour } = useTourQuery(+tourId!);

  const saveAsTemplate = (templateLabel: string) => {
    const tourItemListId = tour && tour.itemListId;
    createTemplateListFromTourList(Number(tourItemListId), templateLabel);
    setShowForm(false);
    setShowSuccessMessage(true);
  };

  return (
    <Formik
      initialValues={{ label: '' }}
      onSubmit={(values) => {
        saveAsTemplate(values.label);
      }}
    >
      {(props: FormikProps<any>) => (
        <Form>
          <div className='input-group'>
            <Field
              name='label'
              className='form-control'
              placeholder={t('templateLabel', { keyPrefix: 'itemList.attrs' })}
            />
            <button className='btn btn-primary' type='submit'>
              {t('save', { keyPrefix: 'global.actions' })}
            </button>
            <button
              className='btn btn-outline-secondary'
              onClick={() => setShowForm(false)}
            >
              {t('abort', { keyPrefix: 'global.actions' })}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
