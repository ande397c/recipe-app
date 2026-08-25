import clsx from 'clsx';
import { ActionSwipe } from '@/components/ui/ActionSwipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FC, ReactNode } from 'react';

interface GroceryItemProps {
  isChecked: boolean;
  isReadOnly?: boolean;
  id: number;
  name?: string;
  onChange: (id: number, checked: boolean) => void;
  onDelete: (id: number) => void;
}

export const GroceryItem: React.FC<GroceryItemProps> = ({
  isChecked,
  isReadOnly,
  id,
  name,
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
      <li className='px-2 py-2 cursor-pointer'>
        {isReadOnly ? (
          <span className={clsx('flex-1 select-none text-sm', isChecked && 'line-through')}>
            {name}
          </span>
        ) : (
          <Label id={id} isChecked={isChecked}>
            <CheckBox
              hide={false}
              id={id}
              name={name}
              isChecked={isChecked}
              isReadOnly={isReadOnly}
              onChange={!isReadOnly ? (e) => onChange(id, e.target.checked) : undefined}
            />
            <span className={clsx('flex-1 select-none text-sm', isChecked && 'line-through')}>
              {name}
            </span>
          </Label>
        )}
      </li>
    </ActionSwipe>
  );
};

interface LabelProps {
  id: number;
  isChecked: boolean;
  children: ReactNode;
}

const Label: FC<LabelProps> = ({ id, isChecked, children }) => {
  return (
    <label
      htmlFor={String(id)}
      className={clsx(
        'flex items-center gap-3 rounded-md',
        isChecked ? 'bg-stone-100 text-stone-400' : 'hover:bg-stone-50'
      )}
    >
      {children}
    </label>
  );
};

interface CheckBoxProps {
  hide: boolean;
  id: number;
  name?: string;
  isChecked: boolean;
  isReadOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: FC<CheckBoxProps> = ({ hide, id, name, isChecked, isReadOnly, onChange }) => {
  if (hide) {
    return null;
  }

  return (
    <input
      className='h-4 w-4 accent-primary'
      type='checkbox'
      id={String(id)}
      name={name}
      checked={isChecked}
      readOnly={isReadOnly}
      onChange={!isReadOnly ? onChange : undefined}
    />
  );
};
