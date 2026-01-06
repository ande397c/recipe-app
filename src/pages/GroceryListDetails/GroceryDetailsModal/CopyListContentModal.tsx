import { BaseModal } from '@/components/BaseModal';
import { Button } from '@/components/shadcn/button';
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/shadcn/item';
import { ScrollArea } from '@/components/shadcn/scroll-area';
import { Spinner } from '@/components/shadcn/spinner';
import { Skeleton } from '@/components/Skeleton';
import { GroceryItem } from '@/interfaces/groceryItem';
import { GroceryList } from '@/interfaces/groceryList';
import { useBulkInsertGroceryItems } from '@/services/groceryItem/useBulkInsertGroceryItems';
import { useFetchGroceryLists } from '@/services/groceryLists/useFetchGroceryLists';
import { useFetchSingleGroceryList } from '@/services/groceryLists/useFetchSingleGroceryList';
import { CSSProperties, FC, FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

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
      maxHeight: '15rem'
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
        <Link to='/grocery-lists'>
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
