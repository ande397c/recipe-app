import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { RecipeItem } from '@/interfaces/recipeItem';

const fetchSingleRecipe = async (id: number | undefined): Promise<RecipeItem> => {
  const { data, error } = await supabase
    .from('recipes')
    .select(
      `
    id,
    recipe_name,
    recipe_url,
    img_url,
    ingredients (
      id,
      ingredient_name,
      is_checked
    ),
    recipe_steps (
      id,
      instruction, 
      is_completed
    ),
    categories (
    id,
    category_name
    )
  `
    )
    .eq('id', id)
    .order('id', { foreignTable: 'recipe_steps' })
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useFetchSingleRecipe = (id: number | undefined) => {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchSingleRecipe(id),
    enabled: !!id
  });
};
