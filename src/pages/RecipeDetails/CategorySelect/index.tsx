import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { SelectActionItem } from "@/components/shadcn/x";
import { Category } from "@/interfaces/category";
import { FC } from "react";
import { EditRecipeFormKeys } from "../RecipeDetailsModal/EditRecipeModal";

interface CategorySelectProps {
  defaultValue: string;
  categories: Category[];
  onValueChange: (formField: EditRecipeFormKeys, category: string) => void;
  onActionClick: () => void;
}

export const CategorySelect: FC<CategorySelectProps> = ({
  defaultValue,
  categories,
  onValueChange,
  onActionClick
}) => {
  return (
    <div>
      <label className='block' htmlFor='categorySelect'>
        Kategori
      </label>
      <Select
        name='categorySelect'
        defaultValue={defaultValue}
        onValueChange={(category) => onValueChange('categoryId', category)}
      >
        <SelectTrigger id='categorySelect'>
          <SelectValue placeholder='Vælg categori' />
        </SelectTrigger>

        <SelectContent className='max-h-60'>
          {categories.map((category) => (
            <SelectItem key={category.id} value={String(category.id)}>
              {category.category_name}
            </SelectItem>
          ))}
          <SelectSeparator />
          <SelectActionItem onSelect={onActionClick} className='text-primary font-medium'>
            + Tilføj categori
          </SelectActionItem>
        </SelectContent>
      </Select>
    </div>
  );
};