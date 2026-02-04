import { FC } from 'react';
import {
  CreateRecipeStepInput,
  useCreateRecipeStep
} from '@/services/recipeSteps/useCreateRecipeStep';
import { useUpdateRecipeStep } from '@/services/recipeSteps/useUpdateRecipeStep';
import { RecipeStep } from '@/interfaces/recipeStep';
import clsx from 'clsx';
import { AutoExpandingTextarea } from './AutoExpandingTextarea';

const sortedItems = (items: RecipeStep[] | undefined) => {
  if (!items) {
    return [];
  }
  return items.sort((a, b) => {    
    return a.id - b.id;
  });
};

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
      <ol className='space-y-2'>
        {sortedItems(steps).map((step, index) => (
          <li
            key={step.id}
            className={clsx(
              'flex items-start gap-2 rounded-md p-2 transition-colors hover:bg-stone-50 hover:cursor-pointer',
              step.is_completed && 'line-through text-stone-500'
            )}
            onClick={() => handleUpdateRecipeStep(step.id, !step.is_completed)}
          >
            <span className='text-xs text-stone-400 mt-1'>{index + 1}.</span>
            <span>{step.instruction}</span>
          </li>
        ))}
      </ol>
    </>
  );
};
