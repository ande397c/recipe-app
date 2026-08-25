import { FC, useState } from 'react';
import { BaseModal } from '@/components/ui/BaseModal';
import { Input } from '@/components/ui/Input';
import { UpdateRecipeInput, useUpdateRecipe } from '@/features/recipes/api/useUpdateRecipe';
import { useFetchSingleRecipe } from '@/features/recipes/api/useFetchSingleRecipie';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useFetchCategories } from '@/features/recipes/api/useFetchCategories';
import { CategorySelect } from '../CategorySelect';
import { CreateCategoryModal } from '../CreateCategoryModal';

interface EditRecipeModalProps {
  recipeId: number | undefined;
  onClose: () => void;
}

interface FormData {
  name: string;
  categoryId: string;
  link: string;
}

export type EditRecipeFormKeys = keyof FormData;

export const EditRecipeModal: FC<EditRecipeModalProps> = ({ recipeId, onClose }) => {
  const { mutate: updateRecipe, isPending: isUpdatingRecipe } = useUpdateRecipe();
  const { data: recipe, isLoading: isRecipeLoading } = useFetchSingleRecipe(recipeId);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const { data: categories } = useFetchCategories();
  const [formData, setFormData] = useState<FormData>({
    name: recipe?.recipe_name ?? '',
    categoryId: String(recipe?.category?.id ?? ''),
    link: recipe?.recipe_url ?? ''
  });

  const handleFormChange = (field: EditRecipeFormKeys, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeId) {
      return;
    }
    const payload: UpdateRecipeInput = {
      id: recipeId,
      recipe_name: formData.name,
      category_id: parseInt(formData.categoryId),
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
    <BaseModal
      showModal={true}
      title='Rediger opskrift'
      size='sm'
      enableClickOutside={false}
      onClose={onClose}
    >
      {showCategoryModal && <CreateCategoryModal onClose={() => setShowCategoryModal(false)} />}
      <form onSubmit={handleUpdateRecipe}>
        {isRecipeLoading ? (
          <Skeleton shape='square' width='20%' />
        ) : (
          <div className='flex flex-col gap-3'>
            <Input
              label='Opskrift navn'
              name='name'
              required
              id='name'
              type='text'
              placeholder='Burger'
              value={formData.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
            />
            <Input
              label='Link'
              name='link'
              id='link'
              type='text'
              placeholder='Link'
              value={formData.link}
              onChange={(e) => handleFormChange('link', e.target.value)}
            />
            <CategorySelect
              defaultValue={formData.categoryId}
              categories={categories ?? []}
              onValueChange={handleFormChange}
              onActionClick={() => setShowCategoryModal(true)}
            />
          </div>
        )}
        <BaseModal.Actions>
          <Button className='w-full' variant='outline' onClick={onClose}>
            Annuller
          </Button>
          <Button className='w-full' disabled={isUpdatingRecipe}>
            {isUpdatingRecipe && <Spinner />}
            Bekræft
          </Button>
        </BaseModal.Actions>
      </form>
    </BaseModal>
  );
};
