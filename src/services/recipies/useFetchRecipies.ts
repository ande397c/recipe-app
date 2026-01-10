import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { RecipeItem } from '@/interfaces/recipeItem';

type RecipyArray = Omit<RecipeItem, 'ingredients' | 'recipe_steps'>;

const fetchRecipies = async (): Promise<RecipyArray[]> => {
  const { data, error } = await supabase.from('recipes').select(
    `
      id,
      recipe_name,
      recipe_url,
      img_url,      
      categories (
        id,
        category_name
      )
    `
  );

  if (error) {
    throw new Error(error.message);
  }
  // @ts-expect-error Supabase is returning categories as an object at runtime, but TypeScript still thinks it’s an array
  return data.map((recipe: RecipyArray) => ({
    ...recipe,
    categories: recipe.categories ? [recipe.categories] : []
  }));
};

export const useFetchRecipies = () => {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipies
  });
};
