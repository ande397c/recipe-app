import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface groceryItemInput {
  id: number;
  is_checked: boolean;
}

interface bulkUpdateGroceryItemInput {
  bulkInput: groceryItemInput[];
}

const bulkUpdateGroceryItems = async ({ bulkInput }: bulkUpdateGroceryItemInput) => {
  const { data, error } = await supabase
    .from('grocery_items')
    .upsert(bulkInput, { onConflict: 'id' })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useBulkUpdateGroceryItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkUpdateGroceryItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grocery-list'] });
    }
  });
};
