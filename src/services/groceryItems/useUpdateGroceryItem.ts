import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

interface UpdateGroceryItemProps {
  checked: boolean;
  id: number;
}

const updateGroceryItem = async ({ checked, id }: UpdateGroceryItemProps) => {
  const { data, error } = await supabase
    .from('grocery_items')
    .update({ is_checked: checked })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUpdateGroceryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGroceryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grocery-list'] });
    }
  });
};
