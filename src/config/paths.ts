export const PATHS = {
  home: {
    path: '/',
    getHref: () => '/'
  },

  auth: {
    login: {
      path: '/login',
      getHref: () => '/login'
    }
  },

  app: {
    recipes: {
      path: '/recipes',
      getHref: () => '/recipes'
    },
    recipe: {
      path: '/recipes/:id',
      getHref: (id: string | number) => `/recipes/${id}`
    },
    mealPlans: {
      path: '/meal-plans',
      getHref: () => '/meal-plans'
    },
    groceryLists: {
      path: '/grocery-lists',
      getHref: () => '/grocery-lists'
    },
    groceryList: {
      path: '/grocery-lists/:id',
      getHref: (id: string | number) => `/grocery-lists/${id}`
    }
  }
} as const;
