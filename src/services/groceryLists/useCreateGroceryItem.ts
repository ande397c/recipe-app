import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

export interface CreateGroceryItemInput {
  name: string;
  listId: string | undefined;
}

const createGroceryItem = async ({ name, listId }: CreateGroceryItemInput) => {
  if (!listId) throw new Error('listId is required');

  const { data, error } = await supabase
    .from('grocery_items')
    .insert([{ grocery_item: name, list_id: listId }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useCreateGroceryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroceryItem,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['grocery-lists', variables.listId]
      });
    }
  });
};
