import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

interface groceryItemInput {
  grocery_item: string;
}

interface bulkUpdateGroceryItemInput {
  id?: string;
  bulkInput: groceryItemInput[];
}

const bulkInsertGroceryItems = async ({ bulkInput }: bulkUpdateGroceryItemInput) => {
  const { data, error } = await supabase
    .from('grocery_items')
    .upsert(bulkInput, { onConflict: 'id' })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useBulkInsertGroceryItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkInsertGroceryItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grocery-lists'] });
    }
  });
};
