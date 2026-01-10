import { FC } from 'react';
import {
  CreateRecipeStepInput,
  useCreateRecipeStep
} from '@/services/recipeSteps/useCreateRecipeStep';
import { useUpdateRecipeStep } from '@/services/recipeSteps/useUpdateRecipeStep';
import { RecipeStep } from '@/interfaces/recipeStep';
import clsx from 'clsx';
import { AutoExpandingTextarea } from './AutoExpandingTextarea';

interface RecipeDetailsStepsProps {
  recipeId: number;
  steps: RecipeStep[];
}

export const RecipeDetailsSteps: FC<RecipeDetailsStepsProps> = ({ steps, recipeId }) => {
  const { mutate: createRecipeStep } = useCreateRecipeStep();
  const { mutate: updateRecipeStep } = useUpdateRecipeStep();

  const handleCreateStep = (newStep: string) => {
    const instruction = newStep.trim();
    if (!instruction) return;

    const payload: CreateRecipeStepInput = {
      instruction,
      recipeId: recipeId
    };

    createRecipeStep(payload, {
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
      <AutoExpandingTextarea onCreateStep={handleCreateStep} />
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
