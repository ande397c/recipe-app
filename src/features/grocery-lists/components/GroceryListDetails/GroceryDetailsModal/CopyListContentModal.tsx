import { BaseModal } from '@/components/ui/BaseModal';
import { Button } from '@/components/ui/button';
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/Skeleton';
import { GroceryItem } from '@/types/groceryItem';
import { GroceryList } from '@/types/groceryList';
import { useBulkInsertGroceryItems } from '@/features/grocery-lists/api/useBulkInsertGroceryItems';
import { useFetchGroceryLists } from '@/features/grocery-lists/api/useFetchGroceryLists';
import { useFetchSingleGroceryList } from '@/features/grocery-lists/api/useFetchSingleGroceryList';
import { CSSProperties, FC, FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '@/config/paths';

interface CopyListContentModalProps {
  listId: number | undefined;
  onClose: () => void;
}

export const CopyListContentModal: FC<CopyListContentModalProps> = ({ listId, onClose }) => {
  const { data: groceryLists, isLoading: isLoadingLists } = useFetchGroceryLists();
  const { data: singleGroceryList, isLoading: isLoadingListDeatils } = useFetchSingleGroceryList(
    Number(listId)
  );
  const { mutate: bulkInsertGroceryItems, isPending: isBulkInserting } =
    useBulkInsertGroceryItems();
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  const pageIsLoading = isLoadingLists || isLoadingListDeatils;
  const listItems = singleGroceryList?.grocery_items as GroceryItem[];
  const availableLists = listId
    ? groceryLists?.filter((list) => list.id !== Number(listId))
    : groceryLists;

  const computedHeightStyles: CSSProperties = useMemo(
    () => ({
      height: String((availableLists?.length ?? 0) * 3) + 'rem',
      minHeight: '5rem',
      maxHeight: '20rem'
    }),
    [availableLists]
  );

  const addContentToList = (e: FormEvent) => {
    e.preventDefault();
    if (!listItems) {
      return;
    }

    const bulkInput =
      listItems?.map((item) => ({ grocery_item: item.grocery_item, list_id: selectedListId })) ||
      [];
    bulkInsertGroceryItems(
      { bulkInput },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.error('Error creating grocery item:', error);
        }
      }
    );
  };

  return (
    <BaseModal showModal={true} title='Kopier indkøb' size='sm' onClose={onClose}>
      <form onSubmit={addContentToList}>
        {pageIsLoading ? (
          <div className='flex flex-col gap-2'>
            <Skeleton shape='rect' width='20%' />
            <Skeleton shape='rect' height='4rem' />
          </div>
        ) : (
          <ScrollArea style={computedHeightStyles}>
            <ReassignSelect
              availableLists={availableLists}
              onSelectList={(id) => setSelectedListId(id)}
              selectedId={selectedListId}
            />
          </ScrollArea>
        )}
        <BaseModal.Actions>
          <Button variant='default' disabled={selectedListId === null || isBulkInserting}>
            {isBulkInserting && <Spinner />}
            Bekræft
          </Button>
        </BaseModal.Actions>
      </form>
    </BaseModal>
  );
};

interface ReassignSelectProps {
  selectedId?: number | null;
  availableLists?: GroceryList[];
  onSelectList: (listId: number) => void;
}

export const ReassignSelect: FC<ReassignSelectProps> = ({
  selectedId,
  availableLists,
  onSelectList
}) => {
  if (!availableLists || availableLists.length === 0) {
    return (
      <div className='flex flex-col gap-2'>
        <p>Ingen lister tilgængelige</p>
        <Link to={PATHS.app.groceryLists.getHref()}>
          <Button variant='secondary'>Opret ny liste</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      {availableLists.map((list) => (
        <button key={list.id} className='hover:bg-muted rounded-sm transition' type='button'>
          <Item
            variant={list.id === selectedId ? 'outline' : 'default'}
            className='p-3 text-left'
            onClick={() => onSelectList(Number(list.id))}
          >
            <ItemContent className='gap-0'>
              <ItemTitle>{list.list_name}</ItemTitle>
              <ItemDescription>Antal indkøb: {list.grocery_items?.length ?? 0}</ItemDescription>
            </ItemContent>
          </Item>
        </button>
      ))}
    </div>
  );
};
