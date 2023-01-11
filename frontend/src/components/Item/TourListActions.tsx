import { PDFDownloadLink } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import TourItemListPdf from '../../utils/pdf/TourItemListPdf';
import { useTourItemsQuery } from '../../utils/queries/useTourItemsQuery';
import { useTourQuery } from '../../utils/queries/useTourQuery';
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
  const { id: tourId } = useParams();
  const { data: tour } = useTourQuery(Number(tourId));
  const { data: items } = useTourItemsQuery(Number(tour && tour.id));

  if (!tour || !items) return null;

  const fileName = `${tour.label} - ${t('many', {
    keyPrefix: 'item',
  })}.pdf`;

  return (
    <PDFDownloadLink
      className='btn btn-primary'
      document={<TourItemListPdf tour={tour} items={items} />}
      fileName={fileName}
    >
      {({ blob, url, loading, error }) =>
        loading
          ? 'Loading document...'
          : t('pdfExport', { keyPrefix: 'itemList' })
      }
    </PDFDownloadLink>
  );
}
