import { FormEvent, useState } from 'react';
import { MainLayout } from '@/components/MainLayout';
import {
  CreateGroceryItemInput,
  useCreateGroceryItem
} from '@/services/groceryItem/useCreateGroceryItem';
import { useUpdateGroceryItem } from '@/services/groceryItem/useUpdateGroceryItem';
import { useFetchSingleGroceryList } from '@/services/groceryLists/useFetchSingleGroceryList';
import { useParams } from 'react-router-dom';
import { GroceryItem } from '@/components/GroceryItem';
import { GroceryListOperations } from './GroceryListOperations';
import { GroceryDetailsModals, GroceryDetailsModalsProps } from './GroceryDetailsModal';
import { Skeleton } from '@/components/Skeleton';
import { GroceryItem as GroceryItemInterface } from '@/interfaces/groceryItem';

const sortedItens = (items: GroceryItemInterface[] | undefined) => {
  if (!items) {
    return [];
  }
  return items.sort((a, b) => {
    if (a.is_checked && !b.is_checked) return 1;
    if (!a.is_checked && b.is_checked) return -1;
    return a.grocery_item.localeCompare(b.grocery_item);
  });
};

export const GroceryListDetails = () => {
  const { id } = useParams();
  const { data: singleGroceryList, isLoading: isLoadingListDeatils } = useFetchSingleGroceryList(
    Number(id)
  );
  const { mutate: createGroceryItem } = useCreateGroceryItem();
  const { mutate: updateGroceryItem } = useUpdateGroceryItem();
  const [newItem, setNewItem] = useState('');
  const [groceryDetailsModal, setGroceryDetailsModal] = useState<GroceryDetailsModalsProps | null>(
    null
  );

  const handleCloseModal = () => {
    setGroceryDetailsModal(null);
  };

  const handleUpdateItem = (id: number, checked: boolean) => {
    updateGroceryItem({
      checked,
      id
    });
  };

  const handleCreateItem = (e: FormEvent) => {
    e.preventDefault();
    const name = newItem.trim();
    if (!name) return;

    const payload: CreateGroceryItemInput = {
      name,
      listId: Number(id)
    };

    createGroceryItem(payload, {
      onSuccess: () => {
        setNewItem('');
      },
      onError: (error) => {
        console.error('Error creating grocery item:', error);
      }
    });
  };

  if (isLoadingListDeatils) {
    return (
      <MainLayout spacing={4}>
        <Skeleton shape='rect' height='1.5rem' width='50%' />
        <Skeleton shape='rect' height='1.5rem' width='15%' />
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} shape='rect' width='100%' />
        ))}
      </MainLayout>
    );
  }

  return (
    <MainLayout title={singleGroceryList?.list_name} displayBackButton>
      {groceryDetailsModal && (
        <GroceryDetailsModals onClose={handleCloseModal} {...groceryDetailsModal} />
      )}

      <GroceryListOperations
        listItems={singleGroceryList?.grocery_items ?? []}
        onDisplayRenameModal={() => setGroceryDetailsModal({ type: 'rename', listId: Number(id) })}
        onDisplayMoveContentModal={() =>
          setGroceryDetailsModal({ type: 'copyContent', listId: Number(id) })
        }
        onDisplayDeleteListModal={() => setGroceryDetailsModal({ type: 'delete', listId: Number(id) })}
      />
      <form onSubmit={handleCreateItem}>
        <input
          name='createGroceryItem'
          className='w-full'
          value={newItem}
          type='text'
          placeholder='Create item'
          onChange={(e) => setNewItem(e.target.value)}
          onBlur={handleCreateItem}
        />
        <button className='hidden'>Tilføj</button>
      </form>
      {sortedItens(singleGroceryList?.grocery_items)?.map((item) => (
        <GroceryItem
          key={item.id}
          id={item.id}
          name={item.grocery_item}
          isChecked={item.is_checked}
          onChange={handleUpdateItem}
        />
      ))}
    </MainLayout>
  );
};
