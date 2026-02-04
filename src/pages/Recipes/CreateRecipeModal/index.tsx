import { useState } from 'react';
import { BaseModal } from '@/components/BaseModal';
import { Input } from '@/components/Input';
import { useCreateRecipe } from '@/services/recipies/useCreateRecipe';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/shadcn/button';
import { Spinner } from '@/components/shadcn/spinner';

interface FormData {
  name: string;
  link: string;
  redirectOnSuccess: boolean;
}

interface CreateRecipeModalProps {
  displayModal: boolean;
  onClose: () => void;
}

export const CreateRecipeModal = ({ displayModal, onClose }: CreateRecipeModalProps) => {
  const navigate = useNavigate();
  const [img, setImg] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    link: '',
    redirectOnSuccess: true
  });
  const { mutate: createRecipe, isPending: isCreatingRecipe } = useCreateRecipe();

  const handleCreateRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData };
    createRecipe(payload, {
      onSuccess: (newList) => {
        onClose();
        if (formData.redirectOnSuccess) {
          navigate(`/recipes/${newList?.id}`);
        }
      },
      onError: (error) => {
        console.error('Error creating grocery item:', error);
      }
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    const valueToUse = e.target.type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: valueToUse
    }));
  };

  return (
    <BaseModal showModal={displayModal} title='Opret ny opskrift' size='sm' onClose={onClose}>
      <form onSubmit={handleCreateRecipe} className='flex flex-col gap-2'>
        <Input
          label='Navn'
          autoComplete='name'
          id='name'
          name='name'
          autoFocus
          required
          type='text'
          placeholder='Koteletter i sticky sauce'
          value={formData.name}
          onChange={handleFormChange}
        />
        <Input
          label='Link'
          id='link'
          name='link'
          type='text'
          placeholder='https://madensverden.dk/koteletter-i-sticky-sauce/'
          value={formData.link}
          onChange={handleFormChange}
        />
        <Input
          id='img'
          name='img'
          label='Billede'
          type='file'
          onChange={(e) => setImg(e.target.files?.[0] || null)}
        />
        <div className='flex items-center'>
          <input
            className='m-2 w-4 h-4 text-white accent-orange-600 rounded-xs'
            type='checkbox'
            id='redirectOnSuccess'
            name='redirectOnSuccess'
            checked={formData.redirectOnSuccess}
            onChange={handleFormChange}
          />
          <label htmlFor='redirectOnSuccess'>Åben opskrift</label>
        </div>
        <BaseModal.Actions>
          <Button disabled={isCreatingRecipe}>
            {isCreatingRecipe && <Spinner />}
            Opret
          </Button>
        </BaseModal.Actions>
      </form>
    </BaseModal>
  );
};
