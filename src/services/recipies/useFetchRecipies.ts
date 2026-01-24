import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { RecipeItem } from '@/interfaces/recipeItem';

export type RecipyArray = Omit<RecipeItem, 'ingredients' | 'recipe_steps'>;

const fetchRecipies = async (): Promise<RecipyArray[]> => {
  const { data, error } = await supabase
    .from('recipes')
    .select(
      `
      id,
      recipe_name,
      recipe_url,
      img_url,      
        category:categories (
        id,
        category_name
        )      
    `
    )
    .overrideTypes<RecipyArray[], { merge: false }>();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useFetchRecipies = () => {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipies
  });
};
