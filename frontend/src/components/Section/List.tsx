import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import Section, { SectionType, SectionTypes } from '../../model/Section';
import { useSectionsQuery } from '../../utils/queries/useSectionsQuery';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useTourQuery } from '../../utils/queries/useTourQuery';
import Tour from '../../model/Tour';
import { Card } from 'react-bootstrap';
import SectionForm from './Form';
import { Dispatch, SetStateAction, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const moment = extendMoment(Moment);

export default function SectionList() {
  return (
    <>
      <TourSections />
    </>
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

interface NewSectionDropDownParams {
  setNewSection: Dispatch<SetStateAction<SectionType | undefined>>;
}

function NewSectionDropDown(props: NewSectionDropDownParams) {
  const { setNewSection } = props;
  const { t } = useTranslation();
  const items = SectionTypes.map((type) => (
    <Dropdown.Item onClick={() => setNewSection(type)} key={type}>
      {t(type.split('::')[1].toLowerCase(), { keyPrefix: 'section.types' })}
    </Dropdown.Item>
  ));
  return (
    <Dropdown>
      <Dropdown.Toggle id='dropdown-basic'>
        {t('new', { keyPrefix: 'section' })}
      </Dropdown.Toggle>

      <Dropdown.Menu>{items}</Dropdown.Menu>
    </Dropdown>
  );
}

function newSectionCard(date: Date, type: SectionType) {
  const newSectionEntry = {
    type: type,
    startAt: date,
    endAt: date,
  } as Section;
  return <SectionCard section={newSectionEntry} isNewSection={true} />;
}

interface SectionsDayParams {
  date: Date;
  sections: readonly Section[];
}

function SectionsDayCard(props: SectionsDayParams) {
  const { date, sections } = props;
  const { t } = useTranslation();
  const [newSection, setNewSection] = useState<SectionType | undefined>(
    undefined,
  );
  const sections1 = sectionsByDate(sections, date);
  const sectionCards = sections1.map((section) => {
    return (
      <div key={section.id}>
        <SectionCard section={section} />
      </div>
    );
  });

  if (newSection) {
    sectionCards.unshift(newSectionCard(date, newSection));
  }

  return (
    <Card className='mt-4'>
      <Card.Header className='d-flex justify-content-between'>
        <b>{t('global.date', { date: date })}</b>
        <NewSectionDropDown setNewSection={setNewSection} />
      </Card.Header>
      <Card.Body>{sectionCards}</Card.Body>
    </Card>
  );
}

interface SectionCardParams {
  isNewSection?: boolean;
  section: Section;
}

function sectionType(section: Section) {
  return section.type!.split('::')[1].toLowerCase();
}

function SectionCard(props: SectionCardParams) {
  const { section, isNewSection } = props;
  const { t } = useTranslation();
  const typeTranslationKey = sectionType(section);
  const [isEditing, setEdit] = useState(!!isNewSection);
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
        <SectionBody
          section={section}
          isEditing={isEditing}
          setEdit={setEdit}
        />
      </Card.Body>
      <Card.Footer>{moment(section.endAt).utc().format('HH:mm')} </Card.Footer>
    </Card>
  );
}

interface SectionBodyParams {
  section: Section;
  isEditing: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
}

function SectionBody(props: SectionBodyParams) {
  const { section, isEditing, setEdit } = props;
  if (isEditing) {
    return (
      <>
        <SectionForm entry={section} setEdit={setEdit} />
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
