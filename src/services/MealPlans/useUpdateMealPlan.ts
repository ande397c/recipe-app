import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { CreateMealPlanInput } from './useCreateMealPlan';

export type UpdateMealPlanInput = Omit<CreateMealPlanInput, 'planDate'> & { id: number };

const updateMealPlan = async ({ id, name, note, recipeId }: UpdateMealPlanInput) => {
  const { data, error } = await supabase
    .from('meal_plans')
    .update({ plan_name: name, recipe_id: recipeId, plan_note: note })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUpdateMealPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMealPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-plans'] });
    }
  });
};
