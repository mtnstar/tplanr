import { useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../App';
import { ItemList } from '../../model/ItemList';
import { deleteItemList } from '../../utils/api/item_lists';
import SportKindContext from '../../utils/providers/SportKindContext';
import { useItemListsQuery } from '../../utils/queries/useItemListsQuery';

export default function ItemListList() {
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

    const deleteItemListMutation = useMutation(deleteItemList, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ['itemLists', sportKind],
        });
      },
    });

    const deleteItemListEntry = (entryId: number) => {
      deleteItemListMutation.mutate(entryId);
    };

    function EntryRow(entry: ItemList) {
      function showEntry(entry: ItemList) {
        navigate(`/item_lists/${entry.id}`);
      }

      return (
        <tr onClick={() => showEntry(entry)} key={entry.id}>
          <td>{entry.templateLabel}</td>
          <td
            className='d-flex justify-content-between'
            onClick={(event) => event.stopPropagation()}
          >
            <div></div>
            <Button
              variant='outline-danger'
              size='sm'
              onClick={() => deleteItemListEntry(Number(entry.id))}
            >
              <Icon.Trash />
            </Button>
          </td>
        </tr>
      );
    }

    if (!data || data.length === 0) {
      return <p>{t('global.no_entries')}</p>;
    }
    const rows = data.map((entry: ItemList) => EntryRow(entry));

    return (
      <Table striped hover className='item-lists align-middle'>
        <thead>
          <tr>
            <th>{t('templateLabel', { keyPrefix: 'itemList.attrs' })}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}
