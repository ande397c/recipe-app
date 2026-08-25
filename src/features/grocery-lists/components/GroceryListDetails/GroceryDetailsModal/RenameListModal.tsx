import { FC, useState } from 'react';
import { BaseModal } from '@/components/ui/BaseModal';
import { Input } from '@/components/ui/Input';
import { useFetchSingleGroceryList } from '@/features/grocery-lists/api/useFetchSingleGroceryList';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  UpdateGroceryListInput,
  useUpdateGroceryList
} from '@/features/grocery-lists/api/useUpdateGroceryList';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface RenameListModalProps {
  listId: number | undefined;
  onClose: () => void;
}

export const RenameListModal: FC<RenameListModalProps> = ({ listId, onClose }) => {
  const { data: groceryList, isLoading: isLoadingListDeatils } = useFetchSingleGroceryList(
    Number(listId)
  );
  const { mutate: updateGroceryList, isPending: isUpdatingGroceryList } = useUpdateGroceryList();
  const [newlistName, setNewListName] = useState('');

  const handleRenameGroceryList = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: UpdateGroceryListInput = {
      id: Number(listId),
      newName: newlistName
    };

    updateGroceryList(payload, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error('Error renaming grocery list:', error);
      }
    });
  };

  return (
    <BaseModal showModal={true} title='Omdøb liste' size='sm' onClose={onClose}>
      <form onSubmit={handleRenameGroceryList}>
        {isLoadingListDeatils ? (
          <div className='flex flex-col gap-4'>
            <Skeleton shape='square' height='4rem' />
          </div>
        ) : (
          <>
            <Input
              label='Navn'
              type='text'
              required
              defaultValue={groceryList?.list_name}
              placeholder='Basis vare'
              onChange={(e) => setNewListName(e.target.value)}
            />
            <BaseModal.Actions>
              <Button disabled={isUpdatingGroceryList}>
                {isUpdatingGroceryList && <Spinner />}
                Omdøb
              </Button>
            </BaseModal.Actions>
          </>
        )}
      </form>
    </BaseModal>
  );
};
