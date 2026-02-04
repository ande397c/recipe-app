import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

interface deleteMealPlanProps {
  id: number | undefined;
}

const deleteMealPlan = async ({ id }: deleteMealPlanProps) => {
  if (!id) {
    throw new Error('Meal plan ID is required for deletion.');
  }
  const { data, error } = await supabase.from('meal_plans').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useDeleteMealPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMealPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-plans' ]});
    }
  });
};
