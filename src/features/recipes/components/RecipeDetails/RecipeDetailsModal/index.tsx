import { FC } from 'react';
import { EditRecipeModal } from './EditRecipeModal';
import { DeleteRecipeModal } from './DeleteRecipeModal';
import { CopyIngrediensModal } from './CopyIngrediensModal';
import { EditRecipeStepModal } from './EditRecipeStepModal';

type Id = number | undefined;

type RenameRecipeModal = {
  recipeId: Id;
  type: 'edit';
};

type CopyIngredientsModal = {
  recipeId: Id;
  type: 'copyIngredients';
};

type DeleteRecipeModal = {
  recipeId: Id;
  type: 'delete';
};

type EditStepModal = {
  stepId: Id;
  type: 'editStep';
};

export type RecipeyDetailsModalsProps =
  | RenameRecipeModal
  | CopyIngredientsModal
  | DeleteRecipeModal
  | EditStepModal;

export const RecipeyDetailsModals: FC<RecipeyDetailsModalsProps & { onClose: () => void }> = (
  props
) => {
  switch (props.type) {
    case 'copyIngredients':
      return <CopyIngrediensModal {...props} />;
    case 'edit':
      return <EditRecipeModal {...props} />;
    case 'editStep':
      return <EditRecipeStepModal {...props} />;
    case 'delete':
      return <DeleteRecipeModal {...props} />;
    default:
      return null;
  }
};
