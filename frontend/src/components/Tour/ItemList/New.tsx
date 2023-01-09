import { Field, FormikProps, Form, Formik } from 'formik';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { queryClient } from '../../../App';
import { ItemList } from '../../../model/ItemList';
import { createTourItemList } from '../../../utils/api/tours';
import SportKindContext from '../../../utils/providers/SportKindContext';
import { useItemListsQuery } from '../../../utils/queries/useItemListsQuery';

export default function TourItemListNew() {
  const { id: tourId } = useParams();
  const { t } = useTranslation();
  const createItemList = (templateId: number | undefined) => {
    createTourItemList(templateId, Number(tourId)).then(() => {
      queryClient.invalidateQueries({
        queryKey: ['tours', Number(tourId)],
      });
    });
  };

  return (
    <Formik
      initialValues={{ templateId: undefined }}
      onSubmit={(values) => {
        const templateId = values.templateId
          ? Number(values.templateId)
          : undefined;
        createItemList(templateId);
      }}
    >
      {(props: FormikProps<any>) => (
        <Form>
          <TemplateSelect />
          <button className='btn btn-primary' type='submit'>
            {t('create', { keyPrefix: 'itemList' })}
          </button>
        </Form>
      )}
    </Formik>
  );
}

function TemplateSelect() {
  const { t } = useTranslation();
  return (
    <div className='mb-3'>
      <label htmlFor='template' className='form-label'>
        {t('template', { keyPrefix: 'itemList' })}
      </label>
      <Field as='select' name='templateId' className='form-select w-25'>
        <TemplateSelectOptions />
      </Field>
    </div>
  );
}

function TemplateSelectOptions() {
  const { sportKind } = useContext(SportKindContext);
  const { data } = useItemListsQuery(sportKind);
  const { t } = useTranslation();
  let options = [
    <option value={undefined} key='noTemplate'>
      {t('noTemplate', { keyPrefix: 'itemList' })}
    </option>,
  ];

  if (data) {
    const templateOptions = data.map((template: ItemList) => (
      <option key={template.id} value={template.id}>
        {template.templateLabel}
      </option>
    ));
    options = options.concat(templateOptions);
  }
  return <>{options}</>;
}
