import { FC } from 'react';
import { RenameRecipeModal } from './RenameRecipeModal';
import { DeleteRecipeModal } from './DeleteRecipeModal';

type RenameRecipeModal = {
  listId: number | undefined;
  type: 'rename';
};

type DeleteRecipeModal = {
  listId: number | undefined;
  type: 'delete';
};

export type RecipeyDetailsModalsProps = RenameRecipeModal | DeleteRecipeModal;

export const RecipeyDetailsModals: FC<RecipeyDetailsModalsProps & { onClose: () => void }> = (
  props
) => {
  switch (props.type) {
    case 'rename':
      return <RenameRecipeModal {...props} />;
    case 'delete':
      return <DeleteRecipeModal {...props} />;
    default:
      return null;
  }
};
