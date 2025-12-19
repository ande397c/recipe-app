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
        className='m-2'
        type='checkbox'
        id={name}
        name={name}
        checked={isChecked}
        onChange={handleInputChange}
      />
      <label
        className={clsx('w-full', {
          'text-black': !isChecked,
          'text-black line-through': isChecked
        })}
        htmlFor={name}
      >
        {name}
      </label>
    </div>
  );
};
