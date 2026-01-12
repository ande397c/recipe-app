import { BaseModal } from '@/components/BaseModal';
import { Button } from '@/components/shadcn/button';
import { ScrollArea } from '@/components/shadcn/scroll-area';
import { Skeleton } from '@/components/Skeleton';
import { ReassignSelect } from '@/pages/GroceryListDetails/GroceryDetailsModal/CopyListContentModal';
import { useBulkInsertGroceryItems } from '@/services/groceryItems/useBulkInsertGroceryItems';
import { useFetchGroceryLists } from '@/services/groceryLists/useFetchGroceryLists';
import { useFetchIngredients } from '@/services/ingredients/useFetchIngredients';
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
      maxHeight: '15rem'
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
