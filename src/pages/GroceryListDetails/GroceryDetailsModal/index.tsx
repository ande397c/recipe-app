import { FC } from 'react';
import { CopyListContentModal } from './CopyListContentModal';
import { RenameListModal } from './RenameListModal';
import { DeleteListtModal } from './DeleteListModal';

type RenameListModal = {
  listId: number | undefined;
  type: 'rename';
};

type CopyListContentModal = {
  listId: number | undefined;
  type: 'copyContent';
};

type DeleteListModal = {
  listId: number | undefined;
  type: 'delete';
};

export type GroceryDetailsModalsProps = RenameListModal | CopyListContentModal | DeleteListModal;

export const GroceryDetailsModals: FC<GroceryDetailsModalsProps & { onClose: () => void }> = (
  props
) => {
  switch (props.type) {
    case 'rename':
      return <RenameListModal {...props} />;
    case 'copyContent':
      return <CopyListContentModal {...props} />;
    case 'delete':
      return <DeleteListtModal {...props} />;
    default:
      return null;
  }
};
