import { FC } from 'react';
import { MoveListContentModal } from './MoveListContentModal';
import { RenameListModal } from './RenameListModal';
import { DeleteListtModal } from './DeleteListModal';

type RenameListModal = {
  listId: string | undefined;
  type: 'rename';
};

type MoveListContentModal = {
  listId: string | undefined;
  type: 'moveContent';
};

type DeleteListModal = {
  listId: string | undefined;
  type: 'delete';
};

export type GroceryDetailsModalsProps = RenameListModal | MoveListContentModal | DeleteListModal;

export const GroceryDetailsModals: FC<GroceryDetailsModalsProps & { onClose: () => void }> = (
  props
) => {
  switch (props.type) {
    case 'rename':
      return <RenameListModal {...props} />;
    case 'moveContent':
      return <MoveListContentModal {...props} />;
    case 'delete':
      return <DeleteListtModal {...props} />;
    default:
      return null;
  }
};
