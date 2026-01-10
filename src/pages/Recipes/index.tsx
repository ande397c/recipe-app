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

export const Recipes = () => {
  const { data: recipies, isLoading } = useFetchRecipies();
  const { data: categories } = useFetchCategories();
  const { setItem, getItem } = useLocalStorage('view');
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
        selectedCategory === 'all'
          ? true
          : (recipe.categories?.some((category) => String(category.id) === selectedCategory) ??
            false);

      const matchesSearch =
        searchVal.trim() === ''
          ? true
          : recipe.recipe_name.toLowerCase().includes(searchVal.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [recipies, selectedCategory, searchVal]);

  const handleViewChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const viewValue = e.currentTarget.value as View;
    setView(viewValue);
    setItem(viewValue);
  };

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
      <ViewButtons isDenseView={isDenseView} onChangeView={handleViewChange} />
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
      <ul className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-12'>
        {searchVal.length === 0 ||
          (selectedCategory !== 'all' && (
            <RecipeCard
              variant='add'
              title='Tilføj'
              isDense={isDenseView}
              onClick={() => setDisplayModal(true)}
            />
          ))}
        {filteredRecipies?.map((recipe) => (
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
