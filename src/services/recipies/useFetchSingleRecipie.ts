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
      ) order by id.asc,
      category:categories!recipes_category_id_fkey (
        id,
        category_name
      )
    `
    )
    .eq('id', id)
    .single()
    .overrideTypes<RecipeItem, { merge: false }>();

  if (error) throw error;
  if (!data) throw new Error('Recipe not found');

  return data;
};

export const useFetchSingleRecipe = (id: number | undefined) => {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchSingleRecipe(id),
    enabled: !!id
  });
};
