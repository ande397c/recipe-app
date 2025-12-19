import { BaseModal } from '@/components/BaseModal';
import { Input } from '@/components/Input';
import { MainLayout } from '@/components/MainLayout';
import { RecipeCard } from '@/components/RecipeCard';
import { Skeleton } from '@/components/Skeleton';
import { ViewButtons } from '@/components/ViewButtons';
import { View } from '@/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useCreateGroceryList } from '@/services/groceryLists/useCreateGroceryList';
import { useFetchGroceryLists } from '@/services/groceryLists/useFetchGroceryLists';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const GroceryLists = () => {
  const navigate = useNavigate();
  const { data: groceryLists, isLoading } = useFetchGroceryLists();
  const { mutate: createGroceryList } = useCreateGroceryList();
  const { setItem, getItem } = useLocalStorage('view');
  const [displayModal, setDisplayModal] = useState(false);
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(true);
  const [groceryListName, setGroceryListName] = useState('');
  const [view, setView] = useState<View>(getItem() ?? 'grid');
  const isDenseView = view === 'list';

  const handleViewChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const viewValue = e.currentTarget.value as View;
    setView(viewValue);
    setItem(viewValue);
  };

  const handleCreateGroceryList = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name: groceryListName };
    createGroceryList(payload, {
      onSuccess: (newList) => {
        setGroceryListName('');
        setDisplayModal(false);
        if (redirectOnSuccess) {
          navigate(`/grocery-lists/${newList?.id}`);
        }
      },
      onError: (error) => {
        console.error('Error creating grocery item:', error);
      }
    });
  };

  if (isLoading) {
    return (
      <MainLayout spacing={4}>
        <Skeleton shape='rect' height='1.5rem' width='50%' />
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
      <BaseModal
        showModal={displayModal}
        title='Tilføj indkøbsliste'
        size='sm'
        onClose={() => setDisplayModal(false)}
      >
        <form onSubmit={handleCreateGroceryList}>
          <Input
            label='Indkøbsliste navn'
            type='text'
            placeholder='Basis vare'
            onChange={(e) => setGroceryListName(e.target.value)}
          />
          <input
            className='mr-1.5'
            type='checkbox'
            id='redirectOnSuccess'
            name='redirectOnSuccess'
            checked={redirectOnSuccess}
            onChange={() => setRedirectOnSuccess((prev) => !prev)}
          />
          <label htmlFor='redirectOnSuccess'>Åben nyoprettede liste?</label>
          <BaseModal.Actions>
            <button
              type='submit'
              className='bg-black text-white px-4 py-2 rounded-md transition cursor-pointer'
            >
              Opret
            </button>
          </BaseModal.Actions>
        </form>
      </BaseModal>
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
