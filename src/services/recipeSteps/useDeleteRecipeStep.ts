import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

interface deleteRecipeProps {
  id: number;
}

const deleteRecipeStep = async ({ id }: deleteRecipeProps) => {
  const { data, error } = await supabase.from('recipe_steps').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useDeleteRecipeStep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecipeStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipe'] });
    }
  });
};
