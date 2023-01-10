import { PDFDownloadLink } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import TourItemListPdf from '../../utils/pdf/TourItemListPdf';
import SaveTourListAsTemplate from './SaveTourListAsTemplate';

export default function ItemTourListActions() {
  return (
    <div className='d-flex justify-content-between mb-3'>
      <ExportPdf />
      <SaveTourListAsTemplate />
    </div>
  );
}

function ExportPdf() {
  const { t } = useTranslation();
  return (
    <PDFDownloadLink
      className='btn btn-primary'
      document={<TourItemListPdf />}
      fileName='somename.pdf'
    >
      {({ blob, url, loading, error }) =>
        loading
          ? 'Loading document...'
          : t('pdfExport', { keyPrefix: 'itemList' })
      }
    </PDFDownloadLink>
  );
}
