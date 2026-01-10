import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { RecipeItem } from '@/interfaces/recipeItem';
import { Category } from '@/interfaces/category';

type RecipeItemDb = Omit<RecipeItem, 'categories'> & {
  categories: Category[] | null;
};

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
    .single<RecipeItemDb>();

  if (error) throw error;
  if (!data) throw new Error('Recipe not found');

  return {
    ...data,
    // @ts-expect-error Supabase is returning categories as an object at runtime, but TypeScript still thinks it’s an array
    categories: data.categories ? [data.categories] : null
  };
};

export const useFetchSingleRecipe = (id: number | undefined) => {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchSingleRecipe(id),
    enabled: !!id
  });
};
