import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Recipes } from '@/pages/Recipes';
import { RecipeDetail } from '@/pages/RecipeDetails';
import { GroceryListDetails } from '@/pages/GroceryListDetails';
import { GroceryLists } from '@/pages/GroceryLists';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/recipes' replace />
  },
  {
    path: '/recipes',
    element: <Recipes />
  },
  {
    path: '/recipes/:id',
    element: <RecipeDetail />
  },
  {
    path: '/grocery-lists',
    element: <GroceryLists />
  },
  {
    path: '/grocery-lists/:id',
    element: <GroceryListDetails />
  }
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
