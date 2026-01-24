import { MainLayout } from '@/components/MainLayout';
import { RecipeCard } from '@/components/RecipeCard';
import { Skeleton } from '@/components/Skeleton';
import { GridListSkeleton } from '@/pages/GroceryLists';
import { useFetchRecipies } from '@/services/recipies/useFetchRecipies';
import { CreateRecipeModal } from './CreateRecipeModal';
import { useMemo, useState } from 'react';
import { ViewButtons } from '@/components/ViewButtons';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { View } from '@/constants';
import { Input } from '@/components/Input';
import { CategoryFilterSelect } from './RecipeFilterSelect';
import { useFetchCategories } from '@/services/categories/useFetchCategories';
import { CardListContainer } from '@/components/CardList';

export const Recipes = () => {
  const { data: recipies, isLoading } = useFetchRecipies();
  const { data: categories } = useFetchCategories();
  const { getItem } = useLocalStorage('view');
  const [displayModal, setDisplayModal] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [view, setView] = useState<View>(getItem() ?? 'grid');

  const isDenseView = view === 'list';
  const filteredRecipies = useMemo(() => {
    if (!recipies) {
      return [];
    }

    return recipies.filter((recipe) => {
      const matchesCategory =
        selectedCategory === 'all' ? true : String(recipe.category?.id) === selectedCategory;

      const matchesSearch =
        searchVal.trim() === ''
          ? true
          : recipe.recipe_name.toLowerCase().includes(searchVal.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [recipies, selectedCategory, searchVal]);

  if (isLoading) {
    return (
      <MainLayout spacing={4}>
        <Skeleton shape='rect' height='1.5rem' width='50%' />
        <Skeleton shape='rect' height='1.5rem' width='15%' />
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
      {displayModal && <CreateRecipeModal displayModal onClose={() => setDisplayModal(false)} />}
      <div className='flex items-center justify-between gap-2 flex-wrap'>
        <CategoryFilterSelect
          categories={categories ?? []}
          defaultValue='all'
          onValueChange={(category) => setSelectedCategory(category)}
        />
        <Input
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder='Søg...'
          name='search'
          id='search'
        />
      </div>
      <ViewButtons isDenseView={isDenseView} onViewChange={(view) => setView(view)} />
      <CardListContainer>
        {searchVal.length === 0 && selectedCategory === 'all' && (
          <RecipeCard
            variant='add'
            title='Tilføj'
            isDense={isDenseView}
            onClick={() => setDisplayModal(true)}
          />
        )}
        {filteredRecipies?.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            isDense={isDenseView}
            title={recipe.recipe_name}
            img={recipe.img_url}
            id={recipe.id}
          />
        ))}
      </CardListContainer>
    </MainLayout>
  );
};
