import { createRef, useRef, useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Typeahead from 'react-bootstrap-typeahead/types/core/Typeahead';
import { useTranslation } from 'react-i18next';
import { Item, ItemCategory } from '../../../model/Item';
import TourItem from '../../../model/TourItem';
import { searchItems } from '../../../utils/api/items';

interface TypeAheadProps {
  itemCategory: ItemCategory;
  addItem: (itemId: number) => void;
}

function ItemTypeAhead(props: TypeAheadProps) {
  const { itemCategory, addItem } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Item[]>([]);
  const { t } = useTranslation();

  const handleSearch = (query: string) => {
    setIsLoading(true);
    searchItems(query, itemCategory).then((items) => {
      setOptions(items);
    });
    setIsLoading(false);
  };

  const typeahead = createRef<Typeahead>();

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <AsyncTypeahead
      ref={typeahead}
      filterBy={filterBy}
      id='async-example'
      isLoading={isLoading}
      labelKey='labelDe'
      className='w-50'
      minLength={3}
      onChange={(selected) => {
        if (!selected[0]) return;
        addItem((selected[0] as Item).id!);
        typeahead.current!.clear();
      }}
      onSearch={handleSearch}
      options={options}
      placeholder={t('addHint', { keyPrefix: 'item' })}
      //// see https://github.com/ericgio/react-bootstrap-typeahead/issues/704
      renderMenuItemChildren={(option) => {
        return (
          <>
            <span>{(option as Item).labelDe}</span>
          </>
        );
      }}
    />
  );
}

export default ItemTypeAhead;
