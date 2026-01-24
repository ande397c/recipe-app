import { MainLayout } from '@/components/MainLayout';
import { RecipeCard } from '@/components/RecipeCard';
import { Skeleton } from '@/components/Skeleton';
import { ViewButtons } from '@/components/ViewButtons';
import { View } from '@/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useFetchGroceryLists } from '@/services/groceryLists/useFetchGroceryLists';
import { useMemo, useState } from 'react';
import { AddGroceryListModal } from './AddGroceryListModal';
import { Input } from '@/components/Input';
import { CardListContainer } from '@/components/CardList';

export const GroceryLists = () => {
  const { data: groceryLists, isLoading } = useFetchGroceryLists();
  const { getItem } = useLocalStorage('view');
  const [displayModal, setDisplayModal] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [view, setView] = useState<View>(getItem() ?? 'grid');

  const isDenseView = view === 'list';

  const filteredGroceryLists = useMemo(() => {
    if (!groceryLists) {
      return [];
    }

    return groceryLists.filter((list) => {
      const matchesSearch =
        searchVal.trim() === ''
          ? true
          : list.list_name.toLowerCase().includes(searchVal.toLowerCase());

      return matchesSearch;
    });
  }, [groceryLists, searchVal]);  

  if (isLoading) {
    return (
      <MainLayout spacing={4}>
        <Skeleton shape='rect' height='1.5rem' width='50%' />
        <Skeleton shape='rect' height='1.5rem' width='15%' />
        <div className='grid grid-cols-2 gap-5'>
          {Array.from({ length: 6 }).map((_, index) => (
            <GridListSkeleton key={index} />
          ))}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title='Indkøbslister' spacing={4}>
      {displayModal && <AddGroceryListModal showModal onClose={() => setDisplayModal(false)} />}
      <Input
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        placeholder='Søg...'
        name='search'
        id='search'
      />
      <ViewButtons isDenseView={isDenseView} onViewChange={(view) => setView(view)} />
      <CardListContainer>
        {searchVal.length === 0 && (
          <RecipeCard
            variant='add'
            title='Tilføj'
            isDense={isDenseView}
            onClick={() => setDisplayModal((prev) => !prev)}
          />
        )}
        {filteredGroceryLists?.map((groceryList) => (
          <RecipeCard
            key={groceryList.id}
            isDense={isDenseView}
            variant='groceryList'
            id={groceryList.id}
            title={groceryList.list_name}
          />
        ))}
      </CardListContainer>
    </MainLayout>
  );
};

export const GridListSkeleton: React.FC = () => {
  return (
    <div className='flex flex-col gap-2'>
      <Skeleton shape='square' height='7rem' />
      <Skeleton shape='rect' width='50%' alignCenter />
    </div>
  );
};
