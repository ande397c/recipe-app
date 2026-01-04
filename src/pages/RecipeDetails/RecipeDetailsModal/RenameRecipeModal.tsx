import { FC, useState } from 'react';
import { BaseModal } from '@/components/BaseModal';
import { Input } from '@/components/Input';
import { UpdateRecipeInput, useUpdateRecipe } from '@/services/recipies/useUpdateRecipe';
import { useFetchSingleRecipe } from '@/services/recipies/useFetchSingleRecipie';
import { Skeleton } from '@/components/Skeleton';

interface RenameRecipeModalProps {
  recipeId: number | undefined;
  onClose: () => void;
}

interface FormData {
  name: string;
  link: string;
}

export const RenameRecipeModal: FC<RenameRecipeModalProps> = ({ recipeId, onClose }) => {
  const { mutate: updateRecipe, isPending: isUpdatingRecipe } = useUpdateRecipe();
  const { data: recipe, isLoading: isRecipeLoading } = useFetchSingleRecipe(recipeId);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    link: ''
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    const valueToUse = e.target.type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: valueToUse
    }));
  };

  const handleRenameGroceryList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeId) {
      return;
    }
    const payload: UpdateRecipeInput = {
      id: recipeId,
      recipe_name: formData.name,
      recipe_url: formData.link
    };

    updateRecipe(payload, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error('Error updating recipe:', error);
      }
    });
  };

  return (
    <BaseModal showModal={true} title='Rediger opskrift' size='sm' onClose={onClose}>
      <form onSubmit={handleRenameGroceryList}>
        {isRecipeLoading ? (
          <Skeleton shape='square' width='20%' />
        ) : (
          <>
            <Input
              label='Opskrift navn'
              name='name'
              type='text'
              placeholder='Burger'
              defaultValue={recipe?.recipe_name}
              onChange={handleFormChange}
            />
            <Input
              label='Link'
              name='link'
              type='text'
              placeholder='Link'
              defaultValue={recipe?.recipe_url}
              onChange={handleFormChange}
            />
          </>
        )}
        <BaseModal.Actions>
          <button
            type='submit'
            className='bg-black text-white px-4 py-2 rounded-md transition'
            disabled={isUpdatingRecipe}
          >
            Rediger
          </button>
        </BaseModal.Actions>
      </form>
    </BaseModal>
  );
};
