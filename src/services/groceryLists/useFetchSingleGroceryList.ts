import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { GroceryList } from '@/interfaces/groceryList';

const fetchSingleGroceryList = async (id: string | undefined): Promise<GroceryList> => {
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

export const useFetchSingleGroceryList = (id: string | undefined) => {
  return useQuery({
    queryKey: ['grocery-lists', id],
    queryFn: () => fetchSingleGroceryList(id),
    enabled: !!id
  });
};
