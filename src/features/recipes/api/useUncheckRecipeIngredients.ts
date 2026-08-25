import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface IngredientInput {
  id: number;
  is_checked: boolean;
}

interface bulkUpdateRecipeIngredientsInput {
  bulkInput: IngredientInput[];
}

const unCheckRecipeIngredients = async ({ bulkInput }: bulkUpdateRecipeIngredientsInput) => {
  const { data, error } = await supabase
    .from('ingredients')
    .upsert(bulkInput, { onConflict: 'id' })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUncheckRecipeIngredients = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unCheckRecipeIngredients,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipe'] });
    }
  });
};
