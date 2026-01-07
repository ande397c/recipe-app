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
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { RecipeDetailsLayout } from '@/components/RecipeDetailsLayout';
import { IconButton } from '@/components/IconButton';

interface RecipeTopUiProps {
  menuItems: MenuItem[];
}
export const RecipeDetail: FC = () => {
  const { id } = useParams();
  const { setItem, getItem } = useLocalStorage('recipeDetailsView');
  const { data: recipe, isLoading } = useFetchSingleRecipe(Number(id));
  const [recipeDetailsView, setRecipeDetailsView] = useState<RecipeDetailsView>(
    getItem() ?? 'grid'
  );
  const [recipeDetailsModal, setRecipeDetailsModal] = useState<RecipeyDetailsModalsProps | null>(
    null
  );

  const isStepView = recipeDetailsView === 'steps';

  const handleViewChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const viewValue = e.currentTarget.value as RecipeDetailsView;
    setRecipeDetailsView(viewValue);
    setItem(viewValue);
  };

  const menuItems: MenuItem[] = [
    {
      label: 'Kopier ingredienser',
      onClick: () => setRecipeDetailsModal({ type: 'copyIngredients', recipeId: Number(id) }),
      icon: faAngleRight
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
        {(recipe?.categories ?? []).length > 0 &&
          recipe?.categories.map((category) => (
            <div className='w-fit px-2 rounded-2xl text-orange-600 border border-orange-600'>
              {category.category_name}
            </div>
          ))}
      </div>
      <ChangeRecipeDetailsView isStepView={isStepView} onChangeView={handleViewChange} />
      {isStepView ? (
        <RecipeDetailsSteps steps={recipe?.recipe_steps ?? []} recipeId={Number(id)} />
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
