import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { GroceryList } from '@/interfaces/groceryList';

export interface CreateMealPlanInput {
  name: string;
  note: string
  recipeId: number | null
  planDate: Date
}

const createMealPlan = async ({ name, note, recipeId, planDate }: CreateMealPlanInput): Promise<GroceryList> => {

  const { data, error } = await supabase
    .from('meal_plans')
    .insert([{ plan_name: name, recipe_id: recipeId, plan_note: note, plan_date: planDate }])
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useCreateMealPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMealPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['meal-plans']
      });
    }
  });
};
