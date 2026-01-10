import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

export interface UpdateRecipeInput {
  id: number;
  recipe_name: string;
  category_id: number
  recipe_url: string;
}

const updateRecipe = async ({ id, recipe_name, category_id, recipe_url }: UpdateRecipeInput) => {
  const { data, error } = await supabase
    .from('recipes')
    .update({ recipe_name, category_id, recipe_url })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipe'] });
    }
  });
};
