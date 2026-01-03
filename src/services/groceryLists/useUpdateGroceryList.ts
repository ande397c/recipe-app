import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

export interface UpdateGroceryListInput {
  id: number;
  newName: string;
}

const updateGroceryList = async ({ newName, id }: UpdateGroceryListInput) => {
  const { data, error } = await supabase.from('grocery_lists').update({ list_name: newName }).eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUpdateGroceryList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGroceryList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grocery-list'] });
    }
  });
};
