import { FC } from 'react';
import { BaseModal } from '@/components/ui/BaseModal';
import { useNavigate } from 'react-router-dom';
import { useDeleteRecipe } from '@/features/recipes/api/useDeleteRecipe';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { PATHS } from '@/config/paths';

interface DeleteRecipeModalProps {
  recipeId: number | undefined;
  onClose: () => void;
}

export const DeleteRecipeModal: FC<DeleteRecipeModalProps> = ({ recipeId, onClose }) => {
  const navigate = useNavigate();
  const { mutate: deleteRecipe, isPending: isDeletingRecipe } = useDeleteRecipe();

  const handleDeleteList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeId) {
      return;
    }
    deleteRecipe(
      { id: recipeId },
      {
        onSuccess: () => {
          navigate(PATHS.app.recipes.getHref(), { replace: true });
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
        <p>Er du sikker på, at du vil slette denne opskrift? Denne handling kan ikke fortrydes.</p>
        <BaseModal.Actions>
          <Button variant='destructive' disabled={isDeletingRecipe}>
            {isDeletingRecipe && <Spinner />}
            Slet
          </Button>
        </BaseModal.Actions>
      </form>
    </BaseModal>
  );
};
