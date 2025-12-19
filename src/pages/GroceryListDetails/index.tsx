import { useState } from 'react';
import { MainLayout } from '@/components/MainLayout';
import {
  CreateGroceryItemInput,
  useCreateGroceryItem
} from '@/services/groceryLists/useCreateGroceryItem';
import { useUpdateGroceryItem } from '@/services/groceryLists/useUpdateGroceryItem';
import { useFetchSingleGroceryList } from '@/services/groceryLists/useFetchSingleGroceryList';
import { useParams } from 'react-router-dom';
import { GroceryItem } from '@/components/GroceryItem';
import { GroceryListOperations } from './GroceryListOperations';
import { GroceryDetailsModals, GroceryDetailsModalsProps } from './GroceryDetailsModal';

export const GroceryListDetails = () => {
  const { id } = useParams();
  const { data: singleGroceryList, isLoading: isLoadingListDeatils } =
    useFetchSingleGroceryList(id);
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

  const handleCreateItem = () => {
    const name = newItem.trim();
    if (!name) return;

    const payload: CreateGroceryItemInput = {
      name,
      listId: id
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
      <MainLayout>
        <p>Loading...</p>
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
        onDisplayRenameModal={() => setGroceryDetailsModal({type: 'rename'})}
        onDisplayMoveContentModal={() => setGroceryDetailsModal({type: 'moveContent', listId: id})}
        onDisplayDeleteListModal={() => setGroceryDetailsModal({type: 'delete', listId: id})}
      />
      <input
        className='my-4'
        value={newItem}
        type='text'
        placeholder='Create item'
        onChange={(e) => setNewItem(e.target.value)}
        onBlur={handleCreateItem}
      />
      {singleGroceryList?.grocery_items?.map((item) => (
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
