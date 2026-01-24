import { FC, FormEvent, useState } from 'react';
import { IngredientItem } from '@/interfaces/ingredientItem';
import { GroceryItem } from '@/components/GroceryItem';
import {
  CreateIngredientInput,
  useCreateIngredient
} from '@/services/ingredients/useCreateIngredient';
import { useUpdateIngredient } from '@/services/ingredients/useUpdateIngredient';
import { Input } from '@/components/Input';

interface RecipeDetailsIngredientsProps {
  recipeId: number;
  ingredients: IngredientItem[];
}

const sortedItens = (items: IngredientItem[] | undefined) => {
  if (!items) {
    return [];
  }
  return items.sort((a, b) => {
    if (a.is_checked && !b.is_checked) return 1;
    if (!a.is_checked && b.is_checked) return -1;
    return a.ingredient_name.localeCompare(b.ingredient_name);
  });
};

export const RecipeDetailsIngredients: FC<RecipeDetailsIngredientsProps> = ({
  ingredients,
  recipeId
}) => {
  const { mutate: createIngredient } = useCreateIngredient();
  const { mutate: updateIngredient } = useUpdateIngredient();
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
      {sortedItens(ingredients)?.map((ingredient) => (
        <GroceryItem
          key={ingredient.id}
          id={ingredient.id}
          name={ingredient.ingredient_name}
          isChecked={ingredient.is_checked}
          onChange={handleUpdateItem}
        />
      ))}
    </>
  );
};
