import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

interface DeleteRecipeIngredientProps {
  id: number;
}

const deleteRecipeIngredient = async ({ id }: DeleteRecipeIngredientProps) => {
  const { data, error } = await supabase.from('ingredients').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useDeleteRecipeIngredient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecipeIngredient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipe'] });
    }
  });
};
