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

import { useState } from 'react';

export const CategorySelect: FC<CategorySelectProps> = ({
  defaultValue,
  categories,
  onValueChange,
  onActionClick
}) => {
  const [open, setOpen] = useState(false);

  const handleActionClick = () => {
    onActionClick();
    setOpen(false);
  };

  return (
    <div>
      <label className='text-left block text-sm' htmlFor='categorySelect'>
        Kategori
      </label>

      <Select
        name='categorySelect'
        defaultValue={defaultValue}
        open={open}
        onOpenChange={setOpen}
        onValueChange={(category) => onValueChange('categoryId', category)}
      >
        <SelectTrigger id='categorySelect'>
          <SelectValue placeholder='Vælg kategori' />
        </SelectTrigger>

        <SelectContent className='max-h-60'>
          {categories.map((category) => (
            <SelectItem key={category.id} value={String(category.id)}>
              {category.category_name}
            </SelectItem>
          ))}

          <SelectSeparator />

          <SelectActionItem onSelect={handleActionClick} className='text-primary font-medium'>
            + Tilføj kategori
          </SelectActionItem>
        </SelectContent>
      </Select>
    </div>
  );
};
