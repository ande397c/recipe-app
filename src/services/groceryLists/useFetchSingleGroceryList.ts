import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { GroceryList } from '@/interfaces/groceryList';

const fetchSingleGroceryList = async (id: number): Promise<GroceryList> => {
  if(!id) {
    throw new Error('Invalid ID');
  }
  const { data, error } = await supabase
    .from('grocery_lists')
    .select(
      `
    id,
    list_name,
    grocery_items (
      id,
      grocery_item,
      is_checked
    )
  `
    )
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useFetchSingleGroceryList = (id: number) => {
  return useQuery({
    queryKey: ['grocery-list', id],
    queryFn: () => fetchSingleGroceryList(id),
    enabled: !!id
  });
};
