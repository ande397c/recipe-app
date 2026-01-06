import { FC, FormEvent, useState } from 'react';
import {
  CreateRecipeStepInput,
  useCreateRecipeStep
} from '@/services/recipeSteps/useCreateRecipeStep';
import { useUpdateRecipeStep } from '@/services/recipeSteps/useUpdateRecipeStep';
import { RecipeStep } from '@/interfaces/recipeStep';
import clsx from 'clsx';

interface RecipeDetailsStepsProps {
  recipeId: number;
  steps: RecipeStep[];
}

export const RecipeDetailsSteps: FC<RecipeDetailsStepsProps> = ({ steps, recipeId }) => {
  const { mutate: createRecipeStep } = useCreateRecipeStep();
  const { mutate: updateRecipeStep } = useUpdateRecipeStep();
  const [newStep, setNewStep] = useState('');

  const handleCreateStep = (e: FormEvent) => {
    e.preventDefault();
    const instruction = newStep.trim();
    if (!instruction) return;

    const payload: CreateRecipeStepInput = {
      instruction,
      recipeId: recipeId
    };

    createRecipeStep(payload, {
      onSuccess: () => {
        setNewStep('');
      },
      onError: (error) => {
        console.error('Error creating recipe step:', error);
      }
    });
  };

  const handleUpdateRecipeStep = (id: number, is_completed: boolean) => {
    updateRecipeStep({
      is_completed,
      id
    });
  };

  return (
    <>
      <h2 className='text-lg font-semibold'>Fremgangsmåde</h2>
      <form onSubmit={handleCreateStep}>
        <textarea
          name='createStep'
          className='w-full'
          rows={3}
          value={newStep}
          placeholder='Tilføj step'
          onChange={(e) => setNewStep(e.target.value)}
          onBlur={handleCreateStep}
        />
        <button className='hidden'>Tilføj</button>
      </form>
      <ol className='list-decimal pl-4 cursor-pointer'>
        {steps.map((step) => (
          <li
            key={step.instruction}
            className={clsx('mb-2', step.is_completed && 'line-through')}
            onClick={() => handleUpdateRecipeStep(step.id, !step.is_completed)}
          >
            {step.instruction}
          </li>
        ))}
      </ol>
    </>
  );
};
