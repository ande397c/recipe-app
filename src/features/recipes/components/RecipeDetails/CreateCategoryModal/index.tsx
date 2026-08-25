import { FC, useState } from 'react';
import { BaseModal } from '@/components/ui/BaseModal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { CreateCategoryInput, useCreateCategory } from '@/features/recipes/api/useCreateCategory';

interface CreateCategoryModalProps {
  onClose: () => void;
}


export const CreateCategoryModal: FC<CreateCategoryModalProps> = ({ onClose }) => {
  const { mutate: createCategory, isPending: isCreatingCategory } = useCreateCategory();
    const [categoryName, setCategoryName] = useState('')


  const handleUpdateRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload: CreateCategoryInput = {
      name: categoryName
    };

    createCategory(payload, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error('Error updating recipe:', error);
      }
    });
  };

  return (
    <BaseModal
      showModal={true}
      title='Tilføj kategori'
      size='sm'
      enableClickOutside={false}
      onClose={onClose}
    >
      <form onSubmit={handleUpdateRecipe}>
        <Input
          label='Kategori navn'
          name='name'
          id='name'
          type='text'
          placeholder='Dressing'
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <BaseModal.Actions>
          <Button className='w-full' variant='outline' onClick={onClose}>
            Annuller
          </Button>
          <Button className='w-full' disabled={isCreatingCategory}>
            {isCreatingCategory && <Spinner />}
            Tilføj
          </Button>
        </BaseModal.Actions>
      </form>
    </BaseModal>
  );
};
