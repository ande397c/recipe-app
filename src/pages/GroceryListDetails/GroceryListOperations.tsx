import { GroceryItem } from '@/interfaces/groceryItem';
import { useBulkDeleteGroceryItems } from '@/services/groceryItem/useBulkDeleteGroceryItems';
import { useBulkUpdateGroceryItems } from '@/services/groceryItem/useBulkUpdateGroceryItems';
import { DropdownMenu, MenuItem } from '@/components/DropdownMenu';
import {
  faAngleRight,
  faCheck,
  faEdit,
  faEllipsis,
  faTrashAlt,
  faX
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface GroceryListOperationsProps {
  listItems: GroceryItem[];
  onDisplayRenameModal: () => void;
  onDisplayMoveContentModal: () => void;
  onDisplayDeleteListModal: () => void;
}

export const GroceryListOperations = ({
  listItems,
  onDisplayRenameModal,
  onDisplayMoveContentModal,
  onDisplayDeleteListModal
}: GroceryListOperationsProps) => {
  const { mutate: bulkUpdateGroceryItems } = useBulkUpdateGroceryItems();
  const { mutate: bulkDeleteGroceryItems } = useBulkDeleteGroceryItems();

  const listIsEmpty = listItems.length === 0;

  const handleDeleteAll = () => {
    if (!listItems || listItems.length === 0) {
      return;
    }
    const ids = listItems.map((item) => item.id);
    bulkDeleteGroceryItems(
      { ids },
      {
        onSuccess: () => {
          console.log('All items deleted');
        },
        onError: (error) => {
          console.error('Error deleting items:', error);
        }
      }
    );
  };

  const handleCheckAll = () => {
    if (!listItems || listItems.length === 0) {
      return;
    }
    const bulkInput = listItems.map((item) => ({ id: item.id, is_checked: true }));

    bulkUpdateGroceryItems(
      { bulkInput },
      {
        onSuccess: () => {
          console.log('All items checked');
        },
        onError: (error) => {
          console.error('Error creating grocery item:', error);
        }
      }
    );
  };

  const menuItems: MenuItem[] = [
    {
      label: 'Kopier indhold',
      isDisabled: listIsEmpty,
      onClick: onDisplayMoveContentModal,
      icon: faAngleRight
    },
    { label: 'Check alle', isDisabled: listIsEmpty, onClick: handleCheckAll, icon: faCheck },
    { label: 'Omdøb liste', onClick: onDisplayRenameModal, icon: faEdit },
    { label: 'Clear liste', isDisabled: listIsEmpty, onClick: handleDeleteAll, icon: faX },
    { label: 'Slet liste', onClick: onDisplayDeleteListModal, icon: faTrashAlt, color: 'danger' }
  ];

  return (
    <div className='flex self-end'>
      <DropdownMenu menuItems={menuItems}>
        <FontAwesomeIcon icon={faEllipsis} />
      </DropdownMenu>
    </div>
  );
};
