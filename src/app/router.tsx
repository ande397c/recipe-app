import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { PATHS } from '@/config/paths';
import { RecipesRoute } from './routes/app/recipes';
import { RecipeRoute } from './routes/app/recipe';
import { MealPlanRoute } from './routes/app/meal-plan';
import { GroceryListsRoute } from './routes/app/grocery-lists';
import { GroceryListRoute } from './routes/app/grocery-list';
import { LoginRoute } from './routes/auth/login';
import { NotFoundRoute } from './routes/not-found';

const router = createBrowserRouter([
  {
    path: PATHS.home.path,
    element: <Navigate to={PATHS.app.recipes.getHref()} replace />
  },
  {
    path: PATHS.app.mealPlans.path,
    element: <MealPlanRoute />
  },
  {
    path: PATHS.app.recipes.path,
    element: <RecipesRoute />
  },
  {
    path: PATHS.app.recipe.path,
    element: <RecipeRoute />
  },
  {
    path: PATHS.app.groceryLists.path,
    element: <GroceryListsRoute />
  },
  {
    path: PATHS.app.groceryList.path,
    element: <GroceryListRoute />
  },
  {
    path: PATHS.auth.login.path,
    element: <LoginRoute />
  },
  {
    path: '*',
    element: <NotFoundRoute />
  }
]);

export const AppRouter = () => <RouterProvider router={router} />;
