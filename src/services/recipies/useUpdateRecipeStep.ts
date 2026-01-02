import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

interface UpdateRecipeStepInput {
  is_completed: boolean;
  id: number;
}

const updateRecipeStep = async ({ is_completed, id }: UpdateRecipeStepInput) => {
  const { data, error } = await supabase.from('recipe_steps').update({ is_completed }).eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUpdateRecipeStep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRecipeStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipe'] });
    }
  });
};
