import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { CreateMealPlanInput } from './useCreateMealPlan';

export type CreateBulkMealPlansInput = Omit<CreateMealPlanInput, 'planDate'> & {
  planDates: Date[];
};

const toDateOnly = (date: Date) => date.toISOString().split('T')[0];

const createBulkMealPlans = async ({
  name,
  note,
  recipeId,
  planDates
}: CreateBulkMealPlansInput) => {
  const rows = planDates.map((date) => ({
    plan_name: name,
    plan_note: note,
    recipe_id: recipeId,
    plan_date: toDateOnly(date)
  }));

  const { data, error } = await supabase
    .from('meal_plans')
    .insert(rows)
    .select();

  if (error) throw error;
  return data;
};

export const useCreateBulkMealPlans = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBulkMealPlans,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['meal-plans']
      });
    }
  });
};
