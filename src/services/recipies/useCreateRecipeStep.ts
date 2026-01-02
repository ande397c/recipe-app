import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

export interface CreateRecipeStepInput {
  instruction: string;
  recipeId: string | undefined;
}

const createIngredient = async ({ instruction, recipeId }: CreateRecipeStepInput) => {
  if (!recipeId) throw new Error('recipeId is required');

  const { data, error } = await supabase
    .from('recipe_steps')
    .insert([{ instruction, recipe_fk: recipeId }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useCreateRecipeStep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIngredient,   
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['recipe', variables.recipeId]
      });
    }
  });
};
