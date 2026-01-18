import { FC, useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/shadcn/drawer';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/Input';
import { MealSelect } from '../MealSelect';
import { Calendar } from '@/components/shadcn/calendar';
import { Popover } from '@/components/Popover';
import { da } from 'react-day-picker/locale';
import { ChangeMealDrawerView } from '../MealDrawerView';
import { Item, ItemActions, ItemContent, ItemTitle } from '@/components/shadcn/item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useFetchSingleMealPlan } from '@/services/MealPlans/useFetchSingleMealPlan';
import { Skeleton } from '@/components/Skeleton';
import { MealPlanDay } from '@/interfaces/mealPlanDay';
import { useFetchRecipies } from '@/services/recipies/useFetchRecipies';
import { useCreateMealPlan } from '@/services/MealPlans/useCreateMealPlan';
import { UpdateMealPlanInput, useUpdateMealPlan } from '@/services/MealPlans/useUpdateMealPlan';
import { MEAL_DRAWER_HEADING } from '../lib/dateFormats';
import { uppercaseFirstLetter } from '@/utils/uppercaseFirstLetter';
import {
  CreateBulkMealPlansInput,
  useCreateBulkMealPlans
} from '@/services/MealPlans/useCreateBulkMealPlans';

type MealDrawerView = 'preview' | 'edit';

interface FormData {
  name: string;
  recipeId: number | undefined;
  note: string;
}

type formKeys = keyof FormData;
interface MealPlanDrawerProps {
  id: number | undefined;
  date: Date;
  isOpen: boolean;
  onClose: () => void;
}

const getDaySelectionInputText = (daysSelected: number): string => {
  if (daysSelected === 0) {
    return '';
  }
  const daySelectionInputText = daysSelected === 1 ? 'dag' : 'dage';
  return `${daysSelected} ${daySelectionInputText} valgt`;
};

const getInitalView = (id: number | undefined): MealDrawerView => {
  const initalView = id ? 'preview' : 'edit';
  return initalView;
};

export const MealPlanDrawer: FC<MealPlanDrawerProps> = ({ id, date, isOpen, onClose }) => {
  const fetchEnabled = !!id;
  const [view, setView] = useState<MealDrawerView>(getInitalView(id));
  const { data: mealPlan, isLoading } = useFetchSingleMealPlan(id, fetchEnabled);

  const isPreviewView = view === 'preview';

  const handleViewChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const viewValue = e.currentTarget.value as MealDrawerView;
    setView(viewValue);
  };

  if (isLoading) {
    return <Skeleton shape='rect' height='5rem' />;
  }
  return (
    <Drawer open={isOpen} onAnimationEnd={(open) => console.log(!open)} onClose={onClose}>
      <DrawerContent className='px-3'>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>
              {uppercaseFirstLetter(date.toLocaleDateString('da-DK', MEAL_DRAWER_HEADING))}
            </DrawerTitle>
          </DrawerHeader>
          <ChangeMealDrawerView onChangeView={handleViewChange} isPreviewView={isPreviewView} />
          {isPreviewView ? (
            <MealPreview meal={mealPlan} />
          ) : (
            <EditMealForm id={id} date={date} meal={mealPlan} onClose={onClose} />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

// Componnet
const MealPreview: FC<{ meal: MealPlanDay | undefined }> = ({ meal }) => {
  if (!meal) {
    return <div>Ingen måltid valgt</div>;
  }

  return (
    <div className='flex flex-col gap-4 py-4'>
      <div>
        <h3 className='text-lg font-semibold'>
          {meal.plan_name || meal.recipe?.recipe_name || 'Måltid'}
        </h3>
      </div>
      {meal.recipe && (
        <Item variant='outline' asChild>
          <Link to={`/recipes/${meal.recipe.id}`}>
            <ItemContent>
              <ItemTitle>{meal.recipe.recipe_name}</ItemTitle>
            </ItemContent>
            <ItemActions>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </ItemActions>
          </Link>
        </Item>
      )}
      {meal.plan_note && (
        <div className='rounded-md bg-white border border-border p-3 text-sm text-stone-700'>
          {meal.plan_note}
        </div>
      )}
    </div>
  );
};

// Componnet
const EditMealForm: FC<{
  meal: MealPlanDay | undefined;
  id: number | undefined;
  date: Date;
  onClose: () => void;
}> = ({ meal, id, date, onClose }) => {
  const { data: recipies = [] } = useFetchRecipies();
  const { mutate: createMealPlan } = useCreateMealPlan();
  const { mutate: createBulkMealPlans } = useCreateBulkMealPlans();
  const { mutate: updateMealPlan } = useUpdateMealPlan();
  const [selected, setSelected] = useState<Date[]>();
  const [formData, setFormData] = useState<FormData>({
    name: meal?.plan_name ?? '',
    recipeId: meal?.recipe?.id,
    note: meal?.plan_note ?? ''
  });
  const isEditingMeal = !!id;

  const handleFormChange = (field: formKeys, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingMeal) {
      handleEditMealPlan();
    } else {
      handleCreateMealPlan();
    }
  };

  const handleEditMealPlan = () => {
    const payLoad: UpdateMealPlanInput = {
      id: isEditingMeal ? id : 0,
      name: formData.name,
      note: formData.note,
      recipeId: formData.recipeId ? Number(formData.recipeId) : null,
      planDate: date
    };
    updateMealPlan(payLoad, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  const handleCreateMealPlan = () => {
    if (selected && selected.length > 0) {
      const payload: CreateBulkMealPlansInput = {
        name: formData.name,
        note: formData.note,
        recipeId: Number(formData.recipeId),
        planDates: selected
      };
      createBulkMealPlans(payload, {
        onSuccess: () => {
          onClose();
        }
      });
      return;
    }

    const payLoad = {
      name: formData.name,
      note: formData.note,
      recipeId: Number(formData.recipeId),
      planDate: date
    };
    createMealPlan(payLoad, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <>
      <form id='meal-plan-form' className='flex flex-col gap-4 mt-4' onSubmit={handleFormSubmit}>
        <Input
          name='name'
          id='name'
          label='Navn'
          placeholder='Wraps i ovn'
          value={formData.name}
          onChange={(e) => handleFormChange('name', e.target.value)}
        />
        <MealSelect
          id='selectRecipe'
          defaultValue={String(formData.recipeId ?? '')}
          label='Vælg opkrift'
          recipies={recipies}
          onValueChange={(id) => handleFormChange('recipeId', id)}
        />
        <Popover
          align='left'
          trigger={
            <Input
              label='Vælg til flere dage'
              placeholder='Vælg dag(e)'
              value={getDaySelectionInputText(selected?.length ?? 0)}
              readOnly
            />
          }
        >
          <Calendar
            locale={da}
            mode='multiple'
            weekStartsOn={1}
            today={date}
            showWeekNumber
            selected={selected}
            onSelect={setSelected}
            className='rounded-lg border'
          />
        </Popover>
        <textarea
          value={formData.note}
          onChange={(e) => handleFormChange('note', e.target.value)}
          placeholder='Noter'
          className='w-full resize-none overflow-hidden bg-white border border-muted text-sm rounded-md focus:ring-brand focus:border-brand block p-3.5 shadow-sm'
        />
      </form>
      <DrawerFooter className='flex items-center my-4'>
        <DrawerClose asChild>
          <Button variant='outline'>Luk</Button>
        </DrawerClose>
        <Button form='meal-plan-form'>Gem</Button>
      </DrawerFooter>
    </>
  );
};
