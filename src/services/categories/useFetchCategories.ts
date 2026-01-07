import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { Category } from '@/interfaces/category';

const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from('categories').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useFetchCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });
};
