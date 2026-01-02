import { GroceryItem } from "./groceryItem";

export type IngredientItem = Omit<GroceryItem, 'grocery_item'> & {
  ingredient_name: string;
};
