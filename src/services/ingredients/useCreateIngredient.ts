import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

export interface CreateIngredientInput {
  name: string;
  recipeId: string | undefined;
}

const createIngredient = async ({ name, recipeId }: CreateIngredientInput) => {
  if (!recipeId) throw new Error('recipeId is required');

  const { data, error } = await supabase
    .from('ingredients')
    .insert([{ ingredient_name: name, recipe_id: recipeId }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useCreateIngredient = () => {
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
