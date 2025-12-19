import { MainLayout } from '@/components/MainLayout';
import { RecipeCard } from '@/components/RecipeCard';
import { Skeleton } from '@/components/Skeleton';
import { GridListSkeleton } from '@/pages/GroceryLists';
import { useFetchRecipies } from '@/services/recipies/useFetchRecipies';
import { CreateRecipeModal } from './CreateRecipeModal';
import { useState } from 'react';
import { ViewButtons } from '@/components/ViewButtons';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { View } from '@/constants';

export const Recipes = () => {
  const { data: recipies, isLoading } = useFetchRecipies();
  const { setItem, getItem } = useLocalStorage('view');
  const [displayModal, setDisplayModal] = useState(false);
  const [view, setView] = useState<View>(getItem() ?? 'grid');
  const isDenseView = view === 'list';

  const handleViewChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const viewValue = e.currentTarget.value as View;
    setView(viewValue);
    setItem(viewValue);
  };

  if (isLoading) {
    return (
      <MainLayout spacing={4}>
        <Skeleton shape='rect' height='1.5rem' width='50%' />
        <div className='grid grid-cols-2 gap-5'>
          {Array.from({ length: 4 }).map((_, index) => (
            <GridListSkeleton key={index} />
          ))}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title='Opskrifter' spacing={4}>
      {/* todo: Container comp? */}
      {displayModal && <CreateRecipeModal displayModal onClose={() => setDisplayModal(false)} />}
      <ViewButtons isDenseView={isDenseView} onChangeView={handleViewChange} />
      <ul className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-12'>
        <RecipeCard
          variant='add'
          title='Tilføj'
          isDense={isDenseView}
          onClick={() => setDisplayModal(true)}
        />
        {recipies?.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            isDense={isDenseView}
            title={recipe.recipe_name}
            img={recipe.img_url}
            id={recipe.id}
          />
        ))}
      </ul>
    </MainLayout>
  );
};
