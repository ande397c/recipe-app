import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { GroceryList } from '@/types/groceryList';

const fetchGroceryLists = async (): Promise<GroceryList[]> => {
  const { data, error } = await supabase.from('grocery_lists').select(
    `
    id,
    list_name,
    grocery_items (
      id,
      grocery_item,
      is_checked
    )
  `
  );

  if (error) {
    throw new Error(error.message);
  }

  return data as GroceryList[];
};

export const useFetchGroceryLists = () => {
  return useQuery({
    queryKey: ['grocery-lists'],
    queryFn: fetchGroceryLists
  });
};
