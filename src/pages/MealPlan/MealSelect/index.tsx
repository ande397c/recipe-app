import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/shadcn/select';
import { SelectActionItem } from '@/components/shadcn/x';
import { RecipyArray } from '@/services/recipies/useFetchRecipies';
import { FC, useState } from 'react';

interface MealSelectProps {
  id: string;
  label: string;
  defaultValue: string;
  placeholder?: string;
  recipies: RecipyArray[];
  onValueChange: (recipeId: string) => void;
}

export const MealSelect: FC<MealSelectProps> = ({
  id,
  label,
  defaultValue,
  placeholder,
  recipies,
  onValueChange
}) => {
  const [value, setValue] = useState<string>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <label className='block' htmlFor={id}>
        {label}
      </label>
      <Select
        defaultValue={defaultValue}
        name={id}
        onValueChange={(value) => {
          setValue(value);
          onValueChange(value);
        }}
        value={value || ''}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className='max-h-60'>
          {recipies?.map((recipe) => (
            <SelectItem key={recipe.id} value={String(recipe.id)}>
              {recipe.recipe_name}
            </SelectItem>
          ))}
          <SelectSeparator />
          <SelectActionItem
            onSelect={() => {              
              setValue('');
              onValueChange('');
              setIsOpen(false);
            }}
            className='text-primary font-medium'
          >
            Clear
          </SelectActionItem>
        </SelectContent>
      </Select>
    </div>
  );
};
