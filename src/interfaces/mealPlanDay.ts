import { RecipeItem } from "./recipeItem";

type PreviewRecipe = Omit<RecipeItem, 'ingredients' | 'recipe_steps' | 'category' | 'recipe_url'>;

export interface MealPlanDay {
  id: number;
  created_at: string;
  plan_date: string;
  plan_name: string;
  plan_note: string;
  recipe: PreviewRecipe | null
}
