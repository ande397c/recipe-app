import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

interface bulkDeleteGroceryItemsInput {
  ids: number[];
}

const bulkDeleteGroceryItems = async ({ ids }: bulkDeleteGroceryItemsInput) => {
  console.log(ids);
  const { data, error } = await supabase.from('grocery_items').delete().in('id', ids).select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useBulkDeleteGroceryItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkDeleteGroceryItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grocery-lists'] });
    }
  });
};
