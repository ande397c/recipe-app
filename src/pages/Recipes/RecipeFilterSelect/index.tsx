import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/shadcn/select';
import { Category } from '@/interfaces/category';
import { FC } from 'react';

interface CategoryFilterSelectProps {
  defaultValue: string;
  categories: Category[];
  onValueChange: (category: string) => void;
}

export const CategoryFilterSelect: FC<CategoryFilterSelectProps> = ({
  defaultValue,
  categories,
  onValueChange,
}) => {
  return (
    <div>      
      <Select
        name='categorySelect'
        defaultValue={defaultValue}
        onValueChange={(category) => onValueChange(category)}
      >
        <SelectTrigger id='categorySelect' className='min-w-40 max-h-8'>
          <SelectValue placeholder='Vælg categori' />
        </SelectTrigger>

        <SelectContent className='max-h-60'>
          <SelectItem value='all'>Alle</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={String(category.id)}>
              {category.category_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
