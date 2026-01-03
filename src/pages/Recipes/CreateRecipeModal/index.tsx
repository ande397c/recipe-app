import { useState } from 'react';
import { BaseModal } from '@/components/BaseModal';
import { Input } from '@/components/Input';
import { useCreateRecipe } from '@/services/recipies/useCreateRecipe';
import { useNavigate } from 'react-router-dom';

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
  const [formData, setFormData] = useState<FormData>({
    name: '',
    link: '',
    redirectOnSuccess: true
  });
  const { mutate: createRecipe } = useCreateRecipe();

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
    <BaseModal showModal={displayModal} title='Tilføj opsktift' size='sm' onClose={onClose}>
      <form onSubmit={handleCreateRecipe}>
        <Input
          label='Opskrift navn'
          name='name'
          type='text'
          placeholder='Burger'
          value={formData.name}
          onChange={handleFormChange}
        />
        <Input
          label='Link'
          name='link'
          type='text'
          placeholder='Link'
          value={formData.link}
          onChange={handleFormChange}
        />
        <input
          className='mr-1.5'
          type='checkbox'
          id='redirectOnSuccess'
          name='redirectOnSuccess'
          checked={formData.redirectOnSuccess}
          onChange={handleFormChange}
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
  );
};
