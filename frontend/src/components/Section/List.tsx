import Section from '../../model/Section';
import { useSectionsQuery } from '../../utils/queries/useSectionsQuery';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
const queryClient = new QueryClient();

export default function SectionList() {
  return (
    <QueryClientProvider client={queryClient}>
      <TourSections />
    </QueryClientProvider>
  );
}

function TourSections() {
  const { id: tourId } = useParams();
  const { data } = useSectionsQuery(+tourId!);
  const { t } = useTranslation();

  function SectionEntry(section: Section) {
    return <div key={section.id}>{section.label}</div>;
  }

  if (!data || data.length === 0) {
    return <p>{t('global.no_entries')}</p>;
  }

  const entries = data.map((section: Section) => SectionEntry(section));

  return <div>{entries}</div>;
}
