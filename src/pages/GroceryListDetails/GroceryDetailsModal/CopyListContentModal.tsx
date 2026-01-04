import { BaseModal } from '@/components/BaseModal';
import { Button } from '@/components/shadcn/button';
import { Skeleton } from '@/components/Skeleton';
import { GroceryItem } from '@/interfaces/groceryItem';
import { GroceryList } from '@/interfaces/groceryList';
import { useBulkInsertGroceryItems } from '@/services/groceryItem/useBulkInsertGroceryItems';
import { useFetchGroceryLists } from '@/services/groceryLists/useFetchGroceryLists';
import { useFetchSingleGroceryList } from '@/services/groceryLists/useFetchSingleGroceryList';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const PLACEHOLDER_LIST_VALUE = 'placeholder';

interface CopyListContentModalProps {
  listId: number | undefined;
  onClose: () => void;
}

export const CopyListContentModal: FC<CopyListContentModalProps> = ({ listId, onClose }) => {
  const { data: groceryLists, isLoading: isLoadingLists } = useFetchGroceryLists();
  const { data: singleGroceryList, isLoading: isLoadingListDeatils } = useFetchSingleGroceryList(
    Number(listId)
  );
  const { mutate: bulkInsertGroceryItems } = useBulkInsertGroceryItems();
  const pageIsLoading = isLoadingLists || isLoadingListDeatils;
  const listItems = singleGroceryList?.grocery_items as GroceryItem[];
  const availableLists = listId
    ? groceryLists?.filter((list) => list.id !== Number(listId))
    : groceryLists;

  const addContentToList = (listId: string) => {
    if (listId === PLACEHOLDER_LIST_VALUE || !listItems) {
      return;
    }

    const bulkInput =
      listItems?.map((item) => ({ grocery_item: item.grocery_item, list_id: listId })) || [];
    bulkInsertGroceryItems(
      { bulkInput },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.error('Error creating grocery item:', error);
        }
      }
    );
  };

  return (
    <BaseModal showModal={true} title='Kopier indhold til anden liste' size='sm' onClose={onClose}>
      {pageIsLoading ? (
        <div className='flex flex-col gap-2'>
          <Skeleton shape='rect' width='20%' />
          <Skeleton shape='rect' height='4rem' />
        </div>
      ) : (
        <ReassignSelect availableLists={availableLists} addContentToList={addContentToList} />
      )}
    </BaseModal>
  );
};

interface ReassignSelectProps {
  availableLists?: GroceryList[];
  addContentToList: (listId: string) => void;
}

export const ReassignSelect: FC<ReassignSelectProps> = ({ availableLists, addContentToList }) => {
  if (!availableLists || availableLists.length === 0) {
    return (
      <div className='flex flex-col gap-2'>
        <p>Ingen lister tilgængelige</p>
        <Link to='/grocery-lists'>
          <Button variant='secondary'>Opret ny liste</Button>
        </Link>
      </div>
    );
  }
  return (
    <>
      <label htmlFor='list-select'>Tilføj indhold til:</label>
      <select
        name='lists'
        id='list-select'
        onChange={(e) => {
          addContentToList(e.target.value);
        }}
      >
        <option value={PLACEHOLDER_LIST_VALUE}>Vælg liste</option>
        {availableLists?.map((list) => (
          <option key={list.id} value={list.id}>
            {list.list_name}
          </option>
        ))}
      </select>
    </>
  );
};
