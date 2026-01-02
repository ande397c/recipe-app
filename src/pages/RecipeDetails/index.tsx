import { FC, useState } from 'react';
import { MainLayout } from '@/components/MainLayout';
import { useParams } from 'react-router-dom';
import { useFetchSingleRecipe } from '@/services/recipies/useFetchSingleRecipie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faEdit,
  faEllipsis,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { DropdownMenu, MenuItem } from '@/components/DropdownMenu';
import { RecipeyDetailsModals, RecipeyDetailsModalsProps } from './RecipeDetailsModal';
import clsx from 'clsx';
import { Skeleton } from '@/components/Skeleton';
import { GroceryItem } from '@/components/GroceryItem';
import { IngredientItem } from '@/interfaces/ingredientItem';
import { useUpdateIngredient } from '@/services/recipies/useUpdateIngredient';
import {
  CreateIngredientInput,
  useCreateIngredient
} from '@/services/recipies/useCreateIngredient';
import { CreateRecipeStepInput, useCreateRecipeStep } from '@/services/recipies/useCreateRecipeStep';
import { useUpdateRecipeStep } from '@/services/recipies/useUpdateRecipeStep';

const sortedItens = (items: IngredientItem[] | undefined) => {
  if (!items) {
    return [];
  }
  return items.sort((a, b) => {
    if (a.is_checked && !b.is_checked) return 1;
    if (!a.is_checked && b.is_checked) return -1;
    return a.ingredient_name.localeCompare(b.ingredient_name);
  });
};

export const RecipeDetail: FC = () => {
  const { id } = useParams();
  const { data: recipe, isLoading } = useFetchSingleRecipe(id);
  const { mutate: createIngredient } = useCreateIngredient();
  const { mutate: updateIngredient } = useUpdateIngredient();
  const { mutate: createRecipeStep } = useCreateRecipeStep();
  const { mutate: updateRecipeStep } = useUpdateRecipeStep();
  const [newStep, setNewStep] = useState('');
  const [newItem, setNewItem] = useState('');
  const [recipeDetailsModal, setRecipeDetailsModal] = useState<RecipeyDetailsModalsProps | null>(
    null
  );

  const handleCreateStep = () => {
    const instruction = newStep.trim();
    if (!instruction) return;

    const payload: CreateRecipeStepInput = {
      instruction,
      recipeId: id
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

  const handleCreateItem = () => {
    const name = newItem.trim();
    if (!name) return;

    const payload: CreateIngredientInput = {
      name,
      recipeId: id
    };

    createIngredient(payload, {
      onSuccess: () => {
        setNewItem('');
      },
      onError: (error) => {
        console.error('Error creating grocery item:', error);
      }
    });
  };

  const handleUpdateItem = (id: number, checked: boolean) => {
    updateIngredient({
      checked,
      id
    });
  };

  const menuItems: MenuItem[] = [
    {
      label: 'Rediger opskrift',
      onClick: () => setRecipeDetailsModal({ type: 'rename' }),
      icon: faEdit
    },
    {
      label: 'Slet opskrift',
      onClick: () => setRecipeDetailsModal({ type: 'delete', listId: id }),
      icon: faTrashAlt,
      color: 'danger'
    }
  ];

  const handleCloseModal = () => {
    setRecipeDetailsModal(null);
  };

  if (isLoading) {
    return (
      <MainLayout spacing={4}>
        <Skeleton shape='rect' height='1.5rem' width='15%' />
        <Skeleton shape='rect' height='2rem' width='50%' />
        <Skeleton shape='rect' height='1.5rem' width='50%' alignCenter />
      </MainLayout>
    );
  }

  return (
    <MainLayout title={recipe?.recipe_name} displayBackButton>
      {recipeDetailsModal && (
        <RecipeyDetailsModals {...recipeDetailsModal} onClose={handleCloseModal} />
      )}
      <div
        className={clsx('flex items-center ', {
          'justify-end': !recipe?.img_url,
          'justify-between': recipe?.img_url
        })}
      >
        {recipe?.img_url && (
          <a href={recipe?.recipe_url} target='_blank'>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        )}
        <DropdownMenu menuItems={menuItems}>
          <FontAwesomeIcon icon={faEllipsis} />
        </DropdownMenu>
      </div>
      {recipe?.img_url && (
        <img src={recipe?.img_url} alt={recipe?.recipe_name} className='max-w-[25rem] rounded-sm' />
      )}
      <h2 className='text-lg'>Fremgangsmåde</h2>
      <input
        className='my-4'
        value={newStep}
        type='text'
        placeholder='Tilføj step'
        onChange={(e) => setNewStep(e.target.value)}
        onBlur={handleCreateStep}
      />
      <ol className='list-decimal pl-4 cursor-pointer'>
        {recipe?.recipe_steps.map((step) => (
          <li
            key={step.instruction}
            className={clsx('mb-2', step.is_completed && 'line-through')}
            onClick={() => handleUpdateRecipeStep(step.id, !step.is_completed)}
          >
            {step.instruction}
          </li>
        ))}
      </ol>

      <h2 className='text-lg'>Ingredienser</h2>
      <input
        className='my-4'
        value={newItem}
        type='text'
        placeholder='Create item'
        onChange={(e) => setNewItem(e.target.value)}
        onBlur={handleCreateItem}
      />
      {sortedItens(recipe?.ingredients)?.map((ingredient) => (
        <GroceryItem
          key={ingredient.id}
          id={ingredient.id}
          name={ingredient.ingredient_name}
          isChecked={ingredient.is_checked}
          onChange={handleUpdateItem}
        />
      ))}
    </MainLayout>
  );
};
