import { FC, useEffect, useState } from 'react';
import { BaseModal } from '@/components/BaseModal';
import { Skeleton } from '@/components/Skeleton';
import { Button } from '@/components/shadcn/button';
import { Spinner } from '@/components/shadcn/spinner';
import { useFetchRecipeStep } from '@/services/recipeSteps/useFetchRecipeStep';
import { useUpdateRecipeStepName } from '@/services/recipeSteps/useUpdateRecipeStepName';

interface EditRecipeStepModalProps {
  stepId: number | undefined;
  onClose: () => void;
}

export type EditRecipeStepFormKeys = keyof FormData;

export const EditRecipeStepModal: FC<EditRecipeStepModalProps> = ({ stepId, onClose }) => {
  const { data: recipeStep, isPending: isFetchingRecipeStep } = useFetchRecipeStep(stepId);
  const { mutate: updateRecipeStep, isPending: isUpdatingRecipeStep } = useUpdateRecipeStepName();
  const [instruction, setInstruction] = useState(recipeStep?.instruction ?? '');

  useEffect(() => {
    if (recipeStep) {
      setInstruction(recipeStep.instruction);
    }
  }, [recipeStep]);

  const handleUpdateRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stepId) {
      return;
    }
    const payload = {
      id: stepId,
      instruction
    };

    updateRecipeStep(payload, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <BaseModal
      showModal={true}
      title='Opdater step'
      size='sm'
      enableClickOutside={false}
      onClose={onClose}
    >
      <form onSubmit={handleUpdateRecipe}>
        {isFetchingRecipeStep ? (
          <Skeleton shape='square' height='2.5rem' />
        ) : (
          <div className='flex flex-col gap-3'>
            <textarea
              name='instruction'
              required
              id='instruction'
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              className='w-full resize-none overflow-hidden bg-white border border-muted text-sm rounded-md focus:ring-brand focus:border-brand block p-3.5 shadow-sm'
            />
          </div>
        )}
        <BaseModal.Actions>
          <Button className='w-full' variant='outline' onClick={onClose}>
            Annuller
          </Button>
          <Button className='w-full' disabled={isUpdatingRecipeStep}>
            {isUpdatingRecipeStep && <Spinner />}
            Opdater
          </Button>
        </BaseModal.Actions>
      </form>
    </BaseModal>
  );
};
