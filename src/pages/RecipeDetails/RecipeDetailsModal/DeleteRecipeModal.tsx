import { FC } from 'react';
import { BaseModal } from '@/components/BaseModal';
import { useNavigate } from 'react-router-dom';
import { useDeleteRecipe } from '@/services/recipies/useDeleteRecipe';

interface DeleteRecipeModalProps {
  recipeId: number | undefined;
  onClose: () => void;
}

export const DeleteRecipeModal: FC<DeleteRecipeModalProps> = ({ recipeId, onClose }) => {
  const navigate = useNavigate();
  const { mutate: deleteRecipe } = useDeleteRecipe();

  const handleDeleteList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeId) {
      return;
    }
    deleteRecipe(
      { id: recipeId },
      {
        onSuccess: () => {
          navigate('/recipes', { replace: true });
        },
        onError: (error) => {
          console.error('Error deleting recipe:', error);
        }
      }
    );
  };

  return (
    <BaseModal showModal={true} title='Slet opskrift?' size='sm' onClose={onClose}>
      <form onSubmit={handleDeleteList}>
        <p>
          Er du sikker på, at du vil slette denne opskrift? Denne handling kan ikke fortrydes.
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
