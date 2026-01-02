import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { RecipeItem } from '@/interfaces/recipeItem';

const fetchSingleRecipe = async (id: string | undefined): Promise<RecipeItem> => {
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
    )
  `)
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useFetchSingleRecipe = (id: string | undefined) => {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchSingleRecipe(id),
    enabled: !!id
  });
};
