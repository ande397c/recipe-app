import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

interface DeleteGroceryItemProps {
  id: number;
  listId: number;
}

const deleteGroceryItem = async ({ id }: DeleteGroceryItemProps) => {
  const { data, error } = await supabase.from('grocery_items').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useDeleteGroceryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGroceryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grocery-list'] });
    }
  });
};
