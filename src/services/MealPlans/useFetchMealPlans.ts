import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { MealPlanDay } from '@/interfaces/mealPlanDay';

const fetchMealPlans = async (): Promise<MealPlanDay[]> => {
  const { data, error } = await supabase.from('meal_plans').select('*')

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
