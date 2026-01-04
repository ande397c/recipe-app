import { FC } from 'react';
import { BaseModal } from '@/components/BaseModal';
import { useNavigate } from 'react-router-dom';
import { useDeleteGroceryList } from '@/services/groceryLists/useDeleteGroceryList';
import { Button } from '@/components/shadcn/button';
import { Spinner } from '@/components/shadcn/spinner';

interface DeleteListtModalProps {
  listId: number | undefined;
  onClose: () => void;
}

export const DeleteListtModal: FC<DeleteListtModalProps> = ({ listId, onClose }) => {
  const navigate = useNavigate();
  const { mutate: deleteGroceryList, isPending: isDeletingGroceryList } = useDeleteGroceryList();

  const handleDeleteList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listId) {
      return;
    }
    deleteGroceryList(
      { id: Number(listId) },
      {
        onSuccess: () => {
          navigate('/grocery-lists', { replace: true });
        },
        onError: (error) => {
          console.error('Error creating grocery item:', error);
        }
      }
    );
  };

  return (
    <BaseModal showModal={true} title='Slet liste?' size='sm' onClose={onClose}>
      <form onSubmit={handleDeleteList}>
        <p>
          Er du sikker på, at du vil slette denne indkøbsliste? Denne handling kan ikke fortrydes.
        </p>
        <BaseModal.Actions>
          <Button variant='destructive' disabled={isDeletingGroceryList}>
            {isDeletingGroceryList && <Spinner />}
            Slet
          </Button>
        </BaseModal.Actions>
      </form>
    </BaseModal>
  );
};
