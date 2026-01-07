import { FC, useState } from 'react';
import { BaseModal } from '@/components/BaseModal';
import { Input } from '@/components/Input';
import { UpdateRecipeInput, useUpdateRecipe } from '@/services/recipies/useUpdateRecipe';
import { useFetchSingleRecipe } from '@/services/recipies/useFetchSingleRecipie';
import { Skeleton } from '@/components/Skeleton';
import { Button } from '@/components/shadcn/button';
import { Spinner } from '@/components/shadcn/spinner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/shadcn/select';
import { SelectActionItem } from '@/components/shadcn/x';
import { useFetchCategories } from '@/services/categories/useFetchCategories';

interface EditRecipeModalProps {
  recipeId: number | undefined;
  onClose: () => void;
}

interface FormData {
  name: string;
  categoryId: string;
  link: string;
}

export const EditRecipeModal: FC<EditRecipeModalProps> = ({ recipeId, onClose }) => {
  const { mutate: updateRecipe, isPending: isUpdatingRecipe } = useUpdateRecipe();
  const { data: recipe, isLoading: isRecipeLoading } = useFetchSingleRecipe(recipeId);
  const { data: categories } = useFetchCategories();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    categoryId: '',
    link: ''
  });
  console.log(categories);
  const handleFormChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRenameGroceryList = (e: React.FormEvent) => {
    console.log('handleRenameGroceryList');
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
    <BaseModal
      showModal={true}
      title='Rediger opskrift'
      size='sm'
      enableClickOutside={false}
      onClose={onClose}
    >
      <form onSubmit={handleRenameGroceryList}>
        {isRecipeLoading ? (
          <Skeleton shape='square' width='20%' />
        ) : (
          <div className='flex flex-col gap-3'>
            <Select
              defaultValue={String(recipe?.categories[0].id)}
              onValueChange={(category) => handleFormChange('categoryId', category)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Vælg categori' />
              </SelectTrigger>

              <SelectContent className='max-h-60'>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.category_name}
                  </SelectItem>
                ))}
                <SelectSeparator />
                <SelectActionItem
                  onSelect={() => console.log('Create new item')}
                  className='text-primary font-medium'
                >
                  + Tilføj categori
                </SelectActionItem>
              </SelectContent>
            </Select>

            <Input
              label='Opskrift navn'
              name='name'
              id='name'
              type='text'
              placeholder='Burger'
              defaultValue={recipe?.recipe_name}
              onChange={(e) => handleFormChange('name', e.target.value)}
            />
            <Input
              label='Link'
              name='link'
              id='link'
              type='text'
              placeholder='Link'
              defaultValue={recipe?.recipe_url}
              onChange={(e) => handleFormChange('link', e.target.value)}
            />
          </div>
        )}
        <BaseModal.Actions>
          <Button className='w-full' variant='outline' onClick={onClose}>
            Annuller
          </Button>
          <Button className='w-full' disabled={isUpdatingRecipe}>
            {isUpdatingRecipe && <Spinner />}
            Rediger
          </Button>
        </BaseModal.Actions>
      </form>
    </BaseModal>
  );
};
