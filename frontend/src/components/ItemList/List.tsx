import { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ItemList } from '../../model/ItemList';
import SportKindContext from '../../utils/providers/SportKindContext';
import { useItemListsQuery } from '../../utils/queries/useItemListsQuery';

export default function ItemListsList() {
  return (
    <>
      <ItemListTable />
    </>
  );

  function ItemListTable() {
    const { sportKind } = useContext(SportKindContext);
    const { data } = useItemListsQuery(sportKind);
    const { t } = useTranslation();
    const navigate = useNavigate();

    function EntryRow(entry: ItemList) {
      function showEntry(entry: ItemList) {
        navigate(`/item_lists/${entry.id}`);
      }

      return (
        <tr onClick={() => showEntry(entry)} key={entry.id}>
          <td>{entry.templateLabel}</td>
        </tr>
      );
    }

    if (!data || data.length === 0) {
      return <p>{t('global.no_entries')}</p>;
    }
    const rows = data.map((entry: ItemList) => EntryRow(entry));

    return (
      <Table striped hover>
        <thead>
          <tr>
            <th>{t('templateLabel', { keyPrefix: 'itemList.attrs' })}</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}
