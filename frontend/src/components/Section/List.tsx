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
import SectionForm from './Form';
import { useState } from 'react';
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

function sectionType(section: Section) {
  return section.type.split('::')[1].toLowerCase();
}

function SectionCard(props: SectionCardParams) {
  const { section } = props;
  const { t } = useTranslation();
  const typeTranslationKey = sectionType(section);
  const [isEditing, setEdit] = useState(false);
  return (
    <Card className='mt-4'>
      <Card.Header className='d-flex justify-content-between'>
        <div>
          {moment(section.startAt).utc().format('HH:mm')}{' '}
          {t(typeTranslationKey, { keyPrefix: 'section.types' })} -{' '}
          {section.label}
        </div>
        {!isEditing && (
          <a href='#' onClick={() => setEdit(true)}>
            {t('edit', { keyPrefix: 'global.actions' })}
          </a>
        )}
      </Card.Header>
      <Card.Body>
        <SectionBody section={section} isEditing={isEditing} />
      </Card.Body>
      <Card.Footer>{moment(section.endAt).utc().format('HH:mm')} </Card.Footer>
    </Card>
  );
}

interface SectionBodyParams {
  section: Section;
  isEditing: boolean;
}

function SectionBody(props: SectionBodyParams) {
  const { section, isEditing } = props;
  if (isEditing) {
    return (
      <>
        <SectionForm />
      </>
    );
  } else {
    return (
      <>
        <SectionDetails section={section} />
      </>
    );
  }
}

function SectionDetails(props: SectionCardParams) {
  const { section } = props;
  return (
    <>
      {section.details}
      <StageSectionDetails section={section} />
    </>
  );
}

function StageSectionDetails(props: SectionCardParams) {
  const { section } = props;
  const { t } = useTranslation();
  if (sectionType(section) === 'stage') {
    return (
      <dl>
        {section.distanceKm && (
          <>
            <dt>{t('distanceKm', { keyPrefix: 'section.attrs' })}</dt>
            <dd>
              <div>{section.distanceKm} km</div>
            </dd>
          </>
        )}
        {section.climbUpMeters && (
          <>
            <dt>{t('climbUpMeters', { keyPrefix: 'section.attrs' })}</dt>
            <dd>
              <div>{section.climbUpMeters}hm</div>
            </dd>
          </>
        )}
        {section.climbDownMeters && (
          <>
            <dt>{t('climbDownMeters', { keyPrefix: 'section.attrs' })}</dt>
            <dd>
              <div>{section.climbDownMeters}hm</div>
            </dd>
          </>
        )}
      </dl>
    );
  } else {
    return null;
  }
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
