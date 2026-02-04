import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

interface StepInput {
  id: number;
  is_completed: boolean;
}

interface bulkUpdateRecipeStepsInput {
  bulkInput: StepInput[];
}

const unCheckRecipeSteps = async ({ bulkInput }: bulkUpdateRecipeStepsInput) => {
  const { data, error } = await supabase
    .from('recipe_steps')
    .upsert(bulkInput, { onConflict: 'id' })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUncheckRecipeSteps = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unCheckRecipeSteps,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipe'] });
    }
  });
};
