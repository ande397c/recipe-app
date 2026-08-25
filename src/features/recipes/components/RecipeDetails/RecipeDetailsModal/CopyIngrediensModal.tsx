import { BaseModal } from '@/components/ui/BaseModal';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/Skeleton';
import { ReassignSelect } from '@/features/grocery-lists/components/GroceryListDetails/GroceryDetailsModal/CopyListContentModal';
import { useBulkInsertGroceryItems } from '@/features/grocery-lists/api/useBulkInsertGroceryItems';
import { useFetchGroceryLists } from '@/features/grocery-lists/api/useFetchGroceryLists';
import { useFetchIngredients } from '@/features/recipes/api/useFetchIngredients';
import { CSSProperties, FC, FormEvent, useMemo, useState } from 'react';

interface CopyIngrediensModalProps {
  recipeId?: number | undefined;
  onClose: () => void;
}

export const CopyIngrediensModal: FC<CopyIngrediensModalProps> = ({ recipeId, onClose }) => {
  const { data: groceryLists, isLoading: isLoadingLists } = useFetchGroceryLists();
  const { data: ingredients, isLoading: isLoadingIngredients } = useFetchIngredients(recipeId);
  const { mutate: bulkInsertGroceryItems, isPending: isBulkInserting } =
    useBulkInsertGroceryItems();
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  const pageIsLoading = isLoadingLists || isLoadingIngredients;

  const computedHeightStyles: CSSProperties = useMemo(
    () => ({
      height: String((groceryLists?.length ?? 0) * 3) + 'rem',
      minHeight: '5rem',
      maxHeight: '20rem'
    }),
    [groceryLists]
  );

  const addContentToList = (e: FormEvent) => {
    e.preventDefault();
    if (!ingredients) {
      return;
    }

    const bulkInput =
      ingredients?.map((item) => ({
        grocery_item: item.ingredient_name,
        list_id: selectedListId
      })) || [];

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
    <BaseModal showModal={true} title='Kopier ingredienser' size='sm' onClose={onClose}>
      <form onSubmit={addContentToList}>
        {pageIsLoading ? (
          <div className='flex flex-col gap-2'>
            <Skeleton shape='rect' width='20%' />
            <Skeleton shape='rect' height='4rem' />
          </div>
        ) : (
          <ScrollArea style={computedHeightStyles}>
            <ReassignSelect
              availableLists={groceryLists}
              onSelectList={(id) => setSelectedListId(id)}
              selectedId={selectedListId}
            />
          </ScrollArea>
        )}
        <BaseModal.Actions>
          <Button variant='default' disabled={selectedListId === null || isBulkInserting}>
            Bekræft
          </Button>
        </BaseModal.Actions>
      </form>
    </BaseModal>
  );
};
