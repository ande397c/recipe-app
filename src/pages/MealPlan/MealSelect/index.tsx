import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/shadcn/select';
import { FC } from 'react';

interface MealSelectProps {
  id: string;
  label: string;
  placeholder?: string;
  onValueChange: (recipeId: string) => void;
}

export const MealSelect: FC<MealSelectProps> = ({ id, label, placeholder, onValueChange }) => {
  return (
    <div>
      <label className='block' htmlFor={id}>
        {label}
      </label>
      <Select name={id} onValueChange={(recipeId) => onValueChange(recipeId)}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className='max-h-60'>
          <SelectItem key='1' value='1'>
            Wraps
          </SelectItem>
          <SelectItem key='2' value='2'>
            Korteltter
          </SelectItem>
          <SelectItem key='3' value='3'>
            Flødekartofler
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
