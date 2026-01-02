
import { MainLayout } from '@/components/MainLayout';
import { RecipeCard } from '@/components/RecipeCard';
import { Skeleton } from '@/components/Skeleton';
import { ViewButtons } from '@/components/ViewButtons';
import { View } from '@/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useFetchGroceryLists } from '@/services/groceryLists/useFetchGroceryLists';
import { useState } from 'react';
import { AddGroceryListModal } from './AddGroceryListModal';

export const GroceryLists = () => {
  const { data: groceryLists, isLoading } = useFetchGroceryLists();
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
      <ViewButtons isDenseView={isDenseView} onChangeView={handleViewChange} />
      <ul className='grid grid-cols-2 gap-4 mb-12'>
        <RecipeCard
          variant='add'
          title='Tilføj'
          isDense={isDenseView}
          onClick={() => setDisplayModal((prev) => !prev)}
        />
        {groceryLists?.map((groceryList) => (
          <RecipeCard
            key={groceryList.id}
            isDense={isDenseView}
            variant='groceryList'
            id={groceryList.id}
            title={groceryList.list_name}
          />
        ))}
      </ul>
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
