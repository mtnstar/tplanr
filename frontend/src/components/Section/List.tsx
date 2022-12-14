import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import Section from '../../model/Section';
import { useSectionsQuery } from '../../utils/queries/useSectionsQuery';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useTourQuery } from '../../utils/queries/useTourQuery';
import Tour from '../../model/Tour';
import { Card } from 'react-bootstrap';
const queryClient = new QueryClient();

const moment = extendMoment(Moment);

export default function SectionList() {
  return (
    <QueryClientProvider client={queryClient}>
      <TourSections />
    </QueryClientProvider>
  );
}

function tourDates(tour: Tour) {
  const range = moment.range(moment(tour.startAt), moment(tour.endAt));
  return Array.from(range.by('day') as Date[]);
}

function sectionsByDate(sections: readonly Section[], dateAt: Date) {
  const date = moment(dateAt).utc();
  return sections.filter((section) => {
    const sectionStartAt = moment(section.startAt).utc();
    const sectionEndAt = moment(section.endAt).utc();
    return (
      date.isSame(sectionStartAt, 'day') || date.isSame(sectionEndAt, 'day')
    );
  });
}

interface SectionsDayParams {
  date: Date;
  sections: readonly Section[];
}

function SectionsDayCard(props: SectionsDayParams) {
  const { date, sections } = props;
  const { t } = useTranslation();
  const sections1 = sectionsByDate(sections, date);
  const sectionCards = sections1.map((section) => {
    return (
      <div key={section.id}>
        <SectionCard section={section} />
      </div>
    );
  });

  return (
    <Card className='mt-4'>
      <Card.Header>{t('global.date', { date: date })}</Card.Header>
      <Card.Body>{sectionCards}</Card.Body>
    </Card>
  );
}

interface SectionCardParams {
  section: Section;
}

function SectionCard(props: SectionCardParams) {
  const { section } = props;
  const { t } = useTranslation();
  const typeTranslationKey = section.type.split('::')[1].toLowerCase();
  return (
    <Card className='mt-4'>
      <Card.Header>
        {t(typeTranslationKey, { keyPrefix: 'section.types' })}
      </Card.Header>
      <Card.Body></Card.Body>
    </Card>
  );
}

function TourSections() {
  const { id: tourId } = useParams();
  const { data: tour } = useTourQuery(+tourId!);
  const { data: sections } = useSectionsQuery(+tourId!);
  const { t } = useTranslation();

  if (!tour) return null;

  if (!sections || sections.length === 0) {
    return <p>{t('global.no_entries')}</p>;
  }

  const sectionsDayCards = tourDates(tour).map((tourDate: Date) => {
    return (
      <div key={tourDate.toString()}>
        <SectionsDayCard
          date={tourDate!}
          sections={sections}
          key={tourDate.toString()}
        />
      </div>
    );
  });

  return <div>{sectionsDayCards}</div>;
}
