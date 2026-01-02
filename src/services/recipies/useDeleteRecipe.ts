import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

interface deleteRecipeProps {
  id: string;
}

const deleteRecipe = async ({ id }: deleteRecipeProps) => {
  const { data, error } = await supabase.from('recipes').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['recipes', variables.id] });
    }
  });
};
