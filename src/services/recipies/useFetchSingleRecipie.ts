import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { RecipeItem } from '@/interfaces/recipeItem';

const fetchSingleRecipe = async (id: string | undefined): Promise<RecipeItem> => {
  const { data, error } = await supabase.from('recipes').select('*').eq('id', id).single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useFetchSingleRecipe = (id: string | undefined) => {
  return useQuery({
    queryKey: ['recipes', id],
    queryFn: () => fetchSingleRecipe(id),
    enabled: !!id
  });
};
