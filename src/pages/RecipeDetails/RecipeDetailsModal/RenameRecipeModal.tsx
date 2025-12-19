import { FC, useState } from 'react';
import { BaseModal } from '@/components/BaseModal';
import { Input } from '@/components/Input';

interface RenameRecipeModalProps {
  onClose: () => void;
}

export const RenameRecipeModal: FC<RenameRecipeModalProps> = ({ onClose }) => {
  const [newlistName, setNewListName] = useState('');

  const handleRenameGroceryList = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleRenameGroceryList', newlistName);
  };

  return (
    <BaseModal showModal={true} title='Rediger opskrift' size='sm' onClose={onClose}>
      <form onSubmit={handleRenameGroceryList}>
        <Input
          label='Opskrift navn'
          type='text'
          placeholder='Basis vare'
          onChange={(e) => setNewListName(e.target.value)}
        />
        <BaseModal.Actions>
          <button type='submit' className='bg-black text-white px-4 py-2 rounded-md transition'>
            Opret
          </button>
        </BaseModal.Actions>
      </form>
    </BaseModal>
  );
};
