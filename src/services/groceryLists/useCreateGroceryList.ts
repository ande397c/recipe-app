import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { GroceryList } from '@/interfaces/groceryList';

export interface CreateGroceryItemInput {
  name: string;
}

const createGroceryList = async ({ name }: CreateGroceryItemInput): Promise<GroceryList> => {
  if (!name) throw new Error('listId is required');

  const { data, error } = await supabase
    .from('grocery_lists')
    .insert([{ list_name: name }])
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useCreateGroceryList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroceryList,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['grocery-lists', variables.name]
      });
    }
  });
};
