import clsx from 'clsx';
import { ActionSwipe } from '../ActionSwipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface GroceryItemProps {
  id: number;
  name?: string;
  isChecked: boolean;
  onChange: (id: number, checked: boolean) => void;
  onDelete: (id: number) => void;
}

export const GroceryItem: React.FC<GroceryItemProps> = ({
  id,
  name,
  isChecked,
  onChange,
  onDelete
}) => {
  return (
    <ActionSwipe
      onOpenChange={(open) => {
        if (open) {
          onDelete(id);
        }
      }}
      actions={({ close }) => (
        <button
          className='flex h-full w-24 items-center justify-center bg-destructive text-white'
          onClick={() => {
            onDelete(id);
            close();
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    >
      <label
        htmlFor={String(id)}
        className={clsx(
          'flex items-center gap-3 rounded-md px-2 py-2 cursor-pointer',
          isChecked ? 'bg-stone-100 text-stone-400' : 'hover:bg-stone-50'
        )}
      >
        <input
          className='h-4 w-4 accent-primary'
          type='checkbox'
          id={String(id)}
          name={name}
          checked={isChecked}
          onChange={(e) => onChange(id, e.target.checked)}
        />

        <span className={clsx('flex-1 select-none text-sm', isChecked && 'line-through')}>
          {name}
        </span>
      </label>
    </ActionSwipe>
  );
};
