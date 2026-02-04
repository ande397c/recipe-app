import clsx from 'clsx';

interface GroceryItemProps {
  id: number;
  name?: string;
  isChecked: boolean;
  onChange: (id: number, checked: boolean) => void;
}

export const GroceryItem: React.FC<GroceryItemProps> = ({ id, name, isChecked, onChange }) => {
  return (
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
  );
};
