import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { RecipeItem } from '@/interfaces/recipeItem';

const fetchRecipies = async (): Promise<RecipeItem[]> => {
  const { data, error } = await supabase.from('recipes').select('*');

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
