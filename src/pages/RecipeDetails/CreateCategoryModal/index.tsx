import { FC, useState } from 'react';
import { BaseModal } from '@/components/BaseModal';
import { Input } from '@/components/Input';
import { Button } from '@/components/shadcn/button';
import { Spinner } from '@/components/shadcn/spinner';
import { CreateCategoryInput, useCreateCategory } from '@/services/categories/useCreateCategory';

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
