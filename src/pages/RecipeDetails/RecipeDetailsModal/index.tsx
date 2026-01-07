import { FC } from 'react';
import { EditRecipeModal } from './EditRecipeModal';
import { DeleteRecipeModal } from './DeleteRecipeModal';
import { CopyIngrediensModal } from './CopyIngrediensModal';


type RenameRecipeModal = {
  recipeId: number | undefined;
  type: 'edit';
};

type CopyIngredientsModal = {
  recipeId: number | undefined;
  type: 'copyIngredients';
};

type DeleteRecipeModal = {
  recipeId: number | undefined;
  type: 'delete';
};

export type RecipeyDetailsModalsProps = RenameRecipeModal | CopyIngredientsModal | DeleteRecipeModal;

export const RecipeyDetailsModals: FC<RecipeyDetailsModalsProps & { onClose: () => void }> = (
  props
) => {
  switch (props.type) {
    case 'copyIngredients':
      return <CopyIngrediensModal {...props} />;
    case 'edit':
      return <EditRecipeModal {...props} />;
    case 'delete':
      return <DeleteRecipeModal {...props} />;
    default:
      return null;
  }
};
