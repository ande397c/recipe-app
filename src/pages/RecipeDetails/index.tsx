import { FC, useState } from 'react';
import { MainLayout } from '@/components/MainLayout';
import { useParams } from 'react-router-dom';
import { useFetchSingleRecipe } from '@/services/recipies/useFetchSingleRecipie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faArrowUpRightFromSquare,
  faEdit,
  faEllipsis,
  faListCheck,
  faSquareMinus,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { DropdownMenu, MenuItem } from '@/components/DropdownMenu';
import { RecipeyDetailsModals, RecipeyDetailsModalsProps } from './RecipeDetailsModal';
import clsx from 'clsx';
import { Skeleton } from '@/components/Skeleton';
import { Item, ItemActions, ItemContent, ItemTitle } from '@/components/shadcn/item';
import { RecipeDetailsSteps } from '@/pages/RecipeDetails/RecipeDetailsSteps';
import { RecipeDetailsIngredients } from './RecipeDetailsIngredients';
import { ChangeRecipeDetailsView } from './ChangeRecipeDetailsView';
import { RecipeDetailsView } from '@/constants';
import { RecipeDetailsLayout } from '@/components/RecipeDetailsLayout';
import { IconButton } from '@/components/IconButton';
import { Pill } from '@/components/Pill';
import { useUncheckRecipeSteps } from '@/services/recipeSteps/useUncheckRecipeSteps';
import { useUncheckRecipeIngredients } from '@/services/ingredients/useUncheckRecipeIngredients';

interface RecipeTopUiProps {
  menuItems: MenuItem[];
}
export const RecipeDetail: FC = () => {
  const { id } = useParams();
  const { data: recipe, isLoading } = useFetchSingleRecipe(Number(id));
  const { mutate: unCheckSteps } = useUncheckRecipeSteps();
  const { mutate: unCheckIngredients } = useUncheckRecipeIngredients();
  const [recipeDetailsView, setRecipeDetailsView] = useState<RecipeDetailsView>('steps');
  const [recipeDetailsModal, setRecipeDetailsModal] = useState<RecipeyDetailsModalsProps | null>(
    null
  );
  const isStepView = recipeDetailsView === 'steps';

  const handleUncheckSteps = () => {
    if (!recipe) return;
    const updatedSteps = recipe.recipe_steps.map((step) => ({
      ...step,
      id: step.id,
      is_completed: false
    }));
    unCheckSteps({ bulkInput: updatedSteps });
  };

  const handleUncheckIngredients = () => {
    if (!recipe) return;
    const updatedIngredients = recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      id: ingredient.id,
      is_checked: false
    }));
    unCheckIngredients({ bulkInput: updatedIngredients });
  };

  const handleViewChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const viewValue = e.currentTarget.value as RecipeDetailsView;
    setRecipeDetailsView(viewValue);
  };

  const menuItems: MenuItem[] = [
    {
      label: 'Kopier ingredienser',
      isDisabled: recipe?.ingredients.length === 0,
      onClick: () => setRecipeDetailsModal({ type: 'copyIngredients', recipeId: Number(id) }),
      icon: faAngleRight
    },
    {
      label: 'Uncheck steps',
      isDisabled: recipe?.recipe_steps.length === 0,
      onClick: handleUncheckSteps,
      icon: faSquareMinus
    },
    {
      label: 'Uncheck ingredienser',
      isDisabled: recipe?.ingredients.length === 0,
      onClick: handleUncheckIngredients,
      icon: faListCheck
    },
    {
      label: 'Rediger opskrift',
      onClick: () => setRecipeDetailsModal({ type: 'edit', recipeId: Number(id) }),
      icon: faEdit
    },
    {
      label: 'Slet opskrift',
      onClick: () => setRecipeDetailsModal({ type: 'delete', recipeId: Number(id) }),
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
    <RecipeDetailsLayout
      title={recipe?.recipe_name}
      backgroundImg={recipe?.img_url}
      action={<RecipeTopUi menuItems={menuItems} />}
      meta={recipe?.category && <Pill text={recipe.category.category_name} />}
    >
      {recipeDetailsModal && (
        <RecipeyDetailsModals {...recipeDetailsModal} onClose={handleCloseModal} />
      )}
      <div className={clsx('flex items-center justify-between')}>
        {recipe?.recipe_url && (
          <Item variant='outline' asChild className='p-2'>
            <a href={recipe?.recipe_url} target='_blank' rel='noopener noreferrer'>
              <ItemContent>
                <ItemTitle>Gå til link</ItemTitle>
              </ItemContent>
              <ItemActions>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </ItemActions>
            </a>
          </Item>
        )}
      </div>
      <ChangeRecipeDetailsView isStepView={isStepView} onChangeView={handleViewChange} />
      {isStepView ? (
        <RecipeDetailsSteps
          steps={recipe?.recipe_steps ?? []}
          recipeId={Number(id)}
          onEditStep={(id) => setRecipeDetailsModal({ type: 'editStep', stepId: id })}
        />
      ) : (
        <RecipeDetailsIngredients ingredients={recipe?.ingredients ?? []} recipeId={Number(id)} />
      )}
    </RecipeDetailsLayout>
  );
};

const RecipeTopUi: FC<RecipeTopUiProps> = ({ menuItems }) => {
  return (
    <div className='flex items-center justify-between'>
      <IconButton icon={faAngleLeft} onClick={() => window.history.back()} />
      <DropdownMenu menuItems={menuItems}>
        <IconButton icon={faEllipsis} />
      </DropdownMenu>
    </div>
  );
};
