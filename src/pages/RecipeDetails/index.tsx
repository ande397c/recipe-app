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

// interface RecipeDetailProps {
//   onDisplayRenameModal: () => void;
//   onDisplayDeleteRecipeModal: () => void;
// }

export const RecipeDetail: FC = () => {
  const { id } = useParams();
  const { data: recipe, isLoading } = useFetchSingleRecipe(id);
  const [recipeDetailsModal, setRecipeDetailsModal] = useState<RecipeyDetailsModalsProps | null>(
    null
  );

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
      <MainLayout>
        <p>Loading...</p>
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
        <img src={recipe?.img_url} alt={recipe?.recipe_name} className='max-w-[25rem]' />
      )}
    </MainLayout>
  );
};
