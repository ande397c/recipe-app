import { Category } from "./category";
import { IngredientItem } from "./ingredientItem";
import { RecipeStep } from "./recipeStep";

export interface RecipeItem {
  id: number;
  created_at?: string;
  recipe_name: string;
  recipe_url: string | null;
  img_url?: string;
  ingredients: IngredientItem[];
  recipe_steps: RecipeStep[];
  categories: Category[] | null;
}
