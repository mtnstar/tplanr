import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import Section, { SectionType, SectionTypes } from '../../model/Section';
import { useSectionsQuery } from '../../utils/queries/useSectionsQuery';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useTourQuery } from '../../utils/queries/useTourQuery';
import Tour from '../../model/Tour';
import { Button, Card } from 'react-bootstrap';
import SectionForm from './Form';
import { Dispatch, SetStateAction, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import * as Icon from 'react-bootstrap-icons';
import { deleteSection } from '../../utils/api/sections';
import { useMutation } from 'react-query';
import { convertLocalToUTCDate } from '../../utils/tools/dateHelpers';
import { queryClient } from '../../App';

const moment = extendMoment(Moment);

export default function SectionList() {
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
    <Dropdown align='end'>
      <Dropdown.Toggle id='dropdown-basic'>
        {t('add', { keyPrefix: 'global.actions' })}
      </Dropdown.Toggle>

      <Dropdown.Menu>{items}</Dropdown.Menu>
    </Dropdown>
  );
}

function newSectionCard(
  date: Date,
  type: SectionType,
  closeNewSection: () => void,
) {
  const startAtDate = convertLocalToUTCDate(date);
  const newSectionEntry = {
    type: type,
    startAt: startAtDate,
    endAt: moment(startAtDate).add(1, 'hours').toDate(),
  } as Section;
  return (
    <div key={'newSection'}>
      <SectionCard
        section={newSectionEntry}
        isNewSection={true}
        closeNewSection={closeNewSection}
      />
    </div>
  );
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

  const closeNewSection = () => {
    setNewSection(undefined);
  };

  const sectionCards = sections1.map((section) => {
    return (
      <div key={section.id}>
        <SectionCard section={section} closeNewSection={closeNewSection} />
      </div>
    );
  });

  if (newSection) {
    sectionCards.unshift(newSectionCard(date, newSection, closeNewSection));
  }

  return (
    <Card className='mt-4'>
      <Card.Header className='d-flex justify-content-between'>
        <div className='section-day-date'>
          {t('global.date', { date: date })}
        </div>
        <NewSectionDropDown setNewSection={setNewSection} />
      </Card.Header>
      <Card.Body>{sectionCards}</Card.Body>
    </Card>
  );
}

interface SectionCardParams {
  isNewSection?: boolean;
  closeNewSection: () => void;
  section: Section;
}

function sectionType(section: Section) {
  return section.type!.split('::')[1].toLowerCase();
}

function SectionCard(props: SectionCardParams) {
  const { section, isNewSection, closeNewSection } = props;
  const { t } = useTranslation();
  const typeTranslationKey = sectionType(section);
  const [isEditing, setEdit] = useState(!!isNewSection);
  const { id: tourId } = useParams();
  const closeEdit = () => {
    setEdit(false);
    closeNewSection();
  };
  const editSection = () => {
    setEdit(true);
    closeNewSection();
  };

  const deleteSectionMutation = useMutation(deleteSection, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['sections', Number(tourId)],
      });
    },
  });
  const deleteSectionEntry = () => {
    deleteSectionMutation.mutate(section);
  };

  return (
    <Card className='mt-4' border={isEditing ? 'primary' : 'secondary'}>
      <Card.Header className='d-flex justify-content-between align-items-center'>
        <div>
          {moment(section.startAt).utc().format('HH:mm')}{' '}
          {t(typeTranslationKey, { keyPrefix: 'section.types' })}
          {section.label && ' - ' + section.label}
        </div>
        {!isEditing && (
          <div className='btn-group'>
            <Button
              size='sm'
              variant='outline-primary'
              className='me-1'
              onClick={() => editSection()}
            >
              {t('edit', { keyPrefix: 'global.actions' })}
            </Button>
            <Button
              variant='outline-danger'
              size='sm'
              onClick={() => deleteSectionEntry()}
            >
              <Icon.Trash />
            </Button>
          </div>
        )}
      </Card.Header>
      <Card.Body>
        <SectionBody
          section={section}
          isEditing={isEditing}
          closeEdit={closeEdit}
        />
      </Card.Body>
      <Card.Footer className='d-flex justify-content-between'>
        <div>{moment(section.endAt).utc().format('HH:mm')}</div>
      </Card.Footer>
    </Card>
  );
}

interface SectionBodyParams {
  section: Section;
  isEditing: boolean;
  closeEdit: () => void;
}

function SectionBody(props: SectionBodyParams) {
  const { section, isEditing, closeEdit } = props;
  if (isEditing) {
    return (
      <>
        <SectionForm entry={section} closeForm={closeEdit} />
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

interface SectionDetailParams {
  section: Section;
}

function SectionDetails(props: SectionDetailParams) {
  const { section } = props;
  return (
    <>
      {section.details}
      <StageSectionDetails section={section} />
    </>
  );
}

function StageSectionDetails(props: SectionDetailParams) {
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
