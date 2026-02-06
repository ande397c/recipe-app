import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { RecipeStep } from '@/interfaces/recipeStep';

const fetchRecipeStep = async (stepId: number | undefined): Promise<RecipeStep> => {
  const { data, error } = await supabase.from('recipe_steps').select('*').eq('id', stepId);

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as RecipeStep;
};

export const useFetchRecipeStep = (stepId: number | undefined) => {
  return useQuery({
    queryKey: ['recipe', stepId],
    queryFn: () => fetchRecipeStep(stepId)
  });
};
