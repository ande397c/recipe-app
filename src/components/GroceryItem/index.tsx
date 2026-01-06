import clsx from 'clsx';

interface GroceryItemProps {
  id: number;
  name?: string;
  isChecked: boolean;
  onChange: (id: number, checked: boolean) => void;
}

export const GroceryItem: React.FC<GroceryItemProps> = ({ id, name, isChecked, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, event.target.checked);
  };

  return (
    <div className='flex items-center gap-2'>
      <input
        className='m-2 w-4 h-4 text-white accent-orange-600 rounded-xs'
        type='checkbox'
        id={String(id)}
        name={name}
        checked={isChecked}
        onChange={handleInputChange}
      />
      <label
        htmlFor={String(id)}
        className={clsx('select-none ms-2 font-medium text-heading', {
          'text-black': !isChecked,
          'text-black line-through': isChecked
        })}
      >
        {name}
      </label>
    </div>
  );
};
