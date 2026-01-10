import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

export interface CreateCategoryInput {
  name: string;
}

const createCategory = async ({ name }: CreateCategoryInput) => {

  const { data, error } = await supabase
    .from('categories')
    .insert([{ category_name: name }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['categories', variables.name]
      });
    }
  });
};
