import { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useTranslation } from 'react-i18next';
import { Item, ItemCategory } from '../../../model/Item';
import { searchItems } from '../../../utils/api/items';

interface TypeAheadProps {
  itemCategory: ItemCategory;
  addItem: (item: Item) => void;
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
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id='async-example'
      isLoading={isLoading}
      labelKey='labelDe'
      minLength={3}
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
