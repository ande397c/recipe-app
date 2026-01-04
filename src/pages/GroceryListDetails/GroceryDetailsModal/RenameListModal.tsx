import { FC, useState } from 'react';
import { BaseModal } from '@/components/BaseModal';
import { Input } from '@/components/Input';
import { useFetchSingleGroceryList } from '@/services/groceryLists/useFetchSingleGroceryList';
import { Skeleton } from '@/components/Skeleton';
import {
  UpdateGroceryListInput,
  useUpdateGroceryList
} from '@/services/groceryLists/useUpdateGroceryList';
import { Button } from '@/components/shadcn/button';
import { Spinner } from '@/components/shadcn/spinner';

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
    <BaseModal showModal={true} title='Omdøb liste navn' size='sm' onClose={onClose}>
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
