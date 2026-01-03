import { FC } from 'react';
import { BaseModal } from '@/components/BaseModal';
import { useNavigate } from 'react-router-dom';
import { useDeleteGroceryList } from '@/services/groceryLists/useDeleteGroceryList';

interface DeleteListtModalProps {
  listId: string | undefined;
  onClose: () => void;
}

export const DeleteListtModal: FC<DeleteListtModalProps> = ({ listId, onClose }) => {
  const navigate = useNavigate();
  const { mutate: deleteGroceryList } = useDeleteGroceryList();
  
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
          <button type='submit' className='bg-black text-white px-4 py-2 rounded-md transition'>
            Slet
          </button>
        </BaseModal.Actions>
      </form>
    </BaseModal>
  );
};
