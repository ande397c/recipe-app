import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/shadcn/select';
import { RecipyArray } from '@/services/recipies/useFetchRecipies';
import { FC } from 'react';

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
  return (
    <div>
      <label className='block' htmlFor={id}>
        {label}
      </label>
      <Select
        defaultValue={defaultValue}
        name={id}
        onValueChange={(recipeId) => onValueChange(recipeId)}
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
        </SelectContent>
      </Select>
    </div>
  );
};
