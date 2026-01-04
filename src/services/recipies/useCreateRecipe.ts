import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { GroceryList } from '@/interfaces/groceryList';

export interface CreateRecipeInput {
  name: string;
  link: string;
  imgageUrl: string;
}

const createRecipe = async ({ name, link, imgageUrl }: CreateRecipeInput): Promise<GroceryList> => {
  if (!name) throw new Error('listId is required');

  const { data, error } = await supabase
    .from('recipes')
    .insert([{ recipe_name: name, recipe_url: link, img_url: imgageUrl }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recipes']
      });
    }
  });
};
