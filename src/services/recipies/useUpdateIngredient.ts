import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

interface updateIngredientProps {
  checked: boolean;
  id: number;
}

const updateIngredient = async ({ checked, id }: updateIngredientProps) => {
  const { data, error } = await supabase
    .from('ingredients')
    .update({ is_checked: checked })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUpdateIngredient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateIngredient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipe'] });
    }
  });
};
