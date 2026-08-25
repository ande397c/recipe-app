import { GroceryItem } from './groceryItem';

export interface GroceryList {
  id: number;
  list_name: string;
  grocery_items: GroceryItem[];
}
