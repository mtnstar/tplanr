import { createRef, useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Typeahead from 'react-bootstrap-typeahead/types/core/Typeahead';
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
    setIsLoading(false);
  };

  const handleItemChange = (item: Item) => {
    addItem(item);
  };

  const typeahead = createRef<Typeahead>();

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  const translatedCategory = t(itemCategory, { keyPrefix: 'item_categories' });

  return (
    <AsyncTypeahead
      ref={typeahead}
      filterBy={filterBy}
      id={itemCategory}
      newSelectionPrefix={t('addActionHint', {
        keyPrefix: 'item',
        itemCategory: translatedCategory,
      })}
      allowNew
      isLoading={isLoading}
      labelKey='labelDe'
      className='w-50'
      minLength={3}
      onChange={(selected) => {
        if (!selected[0]) return;

        const item = selected[0] as Item;
        handleItemChange(item);

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
