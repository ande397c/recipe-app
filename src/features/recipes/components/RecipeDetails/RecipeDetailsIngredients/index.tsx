import { FC, FormEvent, useState } from 'react';
import { IngredientItem } from '@/types/ingredientItem';
import { GroceryItem } from '@/features/grocery-lists/components/GroceryItem';
import {
  CreateIngredientInput,
  useCreateIngredient
} from '@/features/recipes/api/useCreateIngredient';
import { useUpdateIngredient } from '@/features/recipes/api/useUpdateIngredient';
import { Input } from '@/components/ui/Input';
import { sortItemsUncheckedFirst } from '@/utils/sortItems';
import { useDeleteRecipeIngredient } from '@/features/recipes/api/useDeleteRecipeIngredient';

interface RecipeDetailsIngredientsProps {
  recipeId: number;
  ingredients: IngredientItem[];
}

export const RecipeDetailsIngredients: FC<RecipeDetailsIngredientsProps> = ({
  ingredients,
  recipeId
}) => {
  const { mutate: createIngredient } = useCreateIngredient();
  const { mutate: updateIngredient } = useUpdateIngredient();
  const { mutate: deleteIngredient } = useDeleteRecipeIngredient();
  const [newItem, setNewItem] = useState('');

  const handleCreateItem = (e: FormEvent) => {
    e.preventDefault();
    const name = newItem.trim();
    if (!name) return;

    const payload: CreateIngredientInput = {
      name,
      recipeId: recipeId
    };

    createIngredient(payload, {
      onSuccess: () => {
        setNewItem('');
      },
      onError: (error) => {
        console.error('Error creating grocery item:', error);
      }
    });
  };

  const handleDeleteItem = (id: number) => {
    deleteIngredient({ id });
  };

  const handleUpdateItem = (id: number, checked: boolean) => {
    updateIngredient({
      checked,
      id
    });
  };

  return (
    <>
      <h2 className='text-lg font-semibold'>Ingredienser</h2>
      <form onSubmit={handleCreateItem}>
        <Input
          name='add'
          value={newItem}
          type='text'
          placeholder='Tilføj ingrediens'
          onChange={(e) => setNewItem(e.target.value)}
          onBlur={handleCreateItem}
        />
        <button className='hidden'>Tilføj</button>
      </form>
      <ul className='list-inside list-disc marker:text-amber-600'>
        {sortItemsUncheckedFirst(ingredients)?.map((ingredient) => (
          <GroceryItem
            key={ingredient.id}
            isChecked={ingredient.is_checked}
            isReadOnly
            id={ingredient.id}
            name={ingredient.ingredient_name}
            onChange={handleUpdateItem}
            onDelete={handleDeleteItem}
          />
        ))}
      </ul>
    </>
  );
};
