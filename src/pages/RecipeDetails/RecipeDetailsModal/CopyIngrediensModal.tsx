import { BaseModal } from '@/components/BaseModal';
import { Skeleton } from '@/components/Skeleton';
import { ReassignSelect } from '@/pages/GroceryListDetails/GroceryDetailsModal/CopyListContentModal';
import { useBulkInsertGroceryItems } from '@/services/groceryItem/useBulkInsertGroceryItems';
import { useFetchGroceryLists } from '@/services/groceryLists/useFetchGroceryLists';
import { useFetchIngredients } from '@/services/ingredients/useFetchIngredients';
import { FC } from 'react';

const PLACEHOLDER_LIST_VALUE = 'placeholder';

interface CopyIngrediensModalProps {
  recipeId?: number | undefined;
  onClose: () => void;
}

export const CopyIngrediensModal: FC<CopyIngrediensModalProps> = ({ recipeId, onClose }) => {
  const { data: groceryLists, isLoading: isLoadingLists } = useFetchGroceryLists();
  const { data: ingredients, isLoading: isLoadingIngredients } = useFetchIngredients(recipeId);
  const { mutate: bulkInsertGroceryItems } = useBulkInsertGroceryItems();

  const pageIsLoading = isLoadingLists || isLoadingIngredients;

  const addContentToList = (listId: string) => {
    if (listId === PLACEHOLDER_LIST_VALUE || !ingredients) {
      return;
    }

    const bulkInput =
      ingredients?.map((item) => ({ grocery_item: item.ingredient_name, list_id: listId })) || [];
    console.log(bulkInput);
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
        <ReassignSelect availableLists={groceryLists} addContentToList={addContentToList} />
      )}
    </BaseModal>
  );
};
