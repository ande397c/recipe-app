import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface UpdateRecipeStepInput {
  id: number;
  instruction: string;
}

const updateRecipeStepName = async ({ instruction, id }: UpdateRecipeStepInput) => {
  const { data, error } = await supabase.from('recipe_steps').update({ instruction }).eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUpdateRecipeStepName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRecipeStepName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipe'] });
    }
  });
};
