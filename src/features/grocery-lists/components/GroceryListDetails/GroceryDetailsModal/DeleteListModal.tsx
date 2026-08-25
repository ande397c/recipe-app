import { FC } from 'react';
import { BaseModal } from '@/components/ui/BaseModal';
import { useNavigate } from 'react-router-dom';
import { useDeleteGroceryList } from '@/features/grocery-lists/api/useDeleteGroceryList';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { PATHS } from '@/config/paths';

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
          navigate(PATHS.app.groceryLists.getHref(), { replace: true });
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
