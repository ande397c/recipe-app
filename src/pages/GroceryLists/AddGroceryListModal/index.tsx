import { FC, useState } from 'react';
import { BaseModal } from '@/components/BaseModal';
import { Input } from '@/components/Input';
import { useCreateGroceryList } from '@/services/groceryLists/useCreateGroceryList';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/shadcn/button';
import { Spinner } from '@/components/shadcn/spinner';

interface AddGroceryListModalProps {
    showModal: boolean;
    onClose: () => void;
}

export const AddGroceryListModal: FC<AddGroceryListModalProps> = ({ showModal, onClose }) => {
  const navigate = useNavigate();
  const { mutate: createGroceryList, isPending: isCreatingGroceryList } = useCreateGroceryList();
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(true);
  const [groceryListName, setGroceryListName] = useState('');

  const handleCreateGroceryList = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name: groceryListName };
    createGroceryList(payload, {
      onSuccess: (newList) => {
        setGroceryListName('');
        onClose();
        if (redirectOnSuccess) {
          navigate(`/grocery-lists/${newList?.id}`);
        }
      },
      onError: (error) => {
        console.error('Error creating grocery item:', error);
      }
    });
  };

  return (
    <BaseModal showModal={showModal} title='Opret ny indkøbsliste' size='sm' onClose={onClose}>
      <form onSubmit={handleCreateGroceryList}>
        <Input
          label='Indkøbsliste navn'
          name='name'
          id='name'
          autoFocus
          type='text'
          placeholder='Basis vare'
          onChange={(e) => setGroceryListName(e.target.value)}
        />
        <div className='flex items-center'>
          <input
            className='mr-1.5 w-4 h-4 text-white accent-orange-600 rounded-xs'
            type='checkbox'
            id='redirectOnSuccess'
            name='redirectOnSuccess'
            checked={redirectOnSuccess}
            onChange={() => setRedirectOnSuccess((prev) => !prev)}
          />
          <label htmlFor='redirectOnSuccess'>Åben indkøbsliste</label>
        </div>
        <BaseModal.Actions>
          <Button disabled={isCreatingGroceryList}>
            {isCreatingGroceryList && <Spinner />}
            Opret
          </Button>
        </BaseModal.Actions>
      </form>
    </BaseModal>
  );
};
