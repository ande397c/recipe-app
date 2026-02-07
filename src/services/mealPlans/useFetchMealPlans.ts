import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { MealPlanDay } from '@/interfaces/mealPlanDay';

const fetchMealPlans = async (): Promise<MealPlanDay[]> => {
  const { data, error } = await supabase.from('meal_plans').select(
    `
      id,
      created_at,
      plan_date,
      plan_name,
      plan_note,
      recipe:recipes!meal_plans_recipe_id_fkey (
        id,
        created_at,
        recipe_name,
        img_url
      )
    `
  )
  .overrideTypes<MealPlanDay[], { merge: false }>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useFetchMealPlans = () => {
  return useQuery({
    queryKey: ['meal-plans'],
    queryFn: () => fetchMealPlans()
  });
};
