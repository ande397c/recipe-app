import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { MealPlanDay } from '@/interfaces/mealPlanDay';

const fetchMealPlan = async (id: number) => {
  const { data, error } = await supabase
    .from('meal_plans')
    .select(
      `
      id,
      created_at,
      plan_name,
      plan_note,
      recipe:recipes!meal_plans_recipe_id_fkey (
        id,
        recipe_name
      )
    `
    )
    .eq('id', id)
    .single()
    .overrideTypes<MealPlanDay, { merge: false }>();

  if (error) throw error;
  return data;
};



export const useFetchSingleMealPlan = (id: number | undefined, enabled: boolean) => {
  return useQuery({
    queryKey: ['meal-plan', id],
    queryFn: () => fetchMealPlan(id as number),
    enabled: enabled && !!id
  });
};

