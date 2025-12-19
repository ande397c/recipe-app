import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

interface deleteGroceryListProps {
  id: string;
}

const deleteGroceryList = async ({ id }: deleteGroceryListProps) => {
  const { data, error } = await supabase.from('grocery_lists').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useDeleteGroceryList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGroceryList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grocery-lists'] });
    }
  });
};
