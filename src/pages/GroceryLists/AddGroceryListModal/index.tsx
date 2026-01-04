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
          <Button disabled={isCreatingGroceryList}>
            {isCreatingGroceryList && <Spinner />}
            Opret
          </Button>
        </BaseModal.Actions>
      </form>
    </BaseModal>
  );
};
