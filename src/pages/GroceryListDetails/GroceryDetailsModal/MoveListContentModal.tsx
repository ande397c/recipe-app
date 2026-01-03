import { BaseModal } from '@/components/BaseModal';
import { MainLayout } from '@/components/MainLayout';
import { GroceryItem } from '@/interfaces/groceryItem';
import { useBulkInsertGroceryItems } from '@/services/groceryItem/useBulkInsertGroceryItems';
import { useFetchGroceryLists } from '@/services/groceryLists/useFetchGroceryLists';
import { useFetchSingleGroceryList } from '@/services/groceryLists/useFetchSingleGroceryList';
import { FC } from 'react';

const PLACEHOLDER_LIST_VALUE = 'placeholder';

interface MoveListContentModalProps {
  listId: string | undefined;
  onClose: () => void;
}

export const MoveListContentModal: FC<MoveListContentModalProps> = ({ listId, onClose }) => {
  const { data: groceryLists, isLoading: isLoadingLists } = useFetchGroceryLists();
  const { data: singleGroceryList, isLoading: isLoadingListDeatils } = useFetchSingleGroceryList(
    Number(listId)
  );
  const { mutate: bulkInsertGroceryItems } = useBulkInsertGroceryItems();

  const pageIsLoading = isLoadingLists || isLoadingListDeatils;
  const listItems = singleGroceryList?.grocery_items as GroceryItem[];

  const availableLists = listId
    ? groceryLists?.filter((list) => list.id !== parseInt(listId))
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
          console.log('All items checked');
        },
        onError: (error) => {
          console.error('Error creating grocery item:', error);
        }
      }
    );
  };

  if (pageIsLoading) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }
  return (
    <BaseModal showModal={true} title='Kopier indhold til anden liste' size='sm' onClose={onClose}>
        <label htmlFor='list-select'>Tilføj indhold til:</label>
        <select name='lists' id='list-select' onChange={(e) => addContentToList(e.target.value)}>
          <option value={PLACEHOLDER_LIST_VALUE}>Vælg liste</option>
          {availableLists?.map((list) => (
            <option key={list.id} value={list.id}>
              {list.list_name}
            </option>
          ))}
        </select>
    </BaseModal>
  );
};
