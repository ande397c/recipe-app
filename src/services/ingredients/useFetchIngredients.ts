import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { IngredientItem } from '@/interfaces/ingredientItem';

const fetchIngredients = async (recipeId: number | undefined): Promise<IngredientItem[]> => {
  const { data, error } = await supabase.from('ingredients').select('*').eq('recipe_id', recipeId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useFetchIngredients = (recipeId: number | undefined) => {
  return useQuery({
    queryKey: ['ingredients', recipeId],
    queryFn: () => fetchIngredients(recipeId)
  });
};
