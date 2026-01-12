import { FC, ReactNode, useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
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

type MealDrawerView = 'preview' | 'edit';
interface MealPlanDrawerProps {
  children: ReactNode;
}

const getDaySelectionInputText = (daysSelected: number): string => {
  if (daysSelected === 0) {
    return '';
  }
  const daySelectionInputText = daysSelected === 1 ? 'dag' : 'dage';

  return `${daysSelected} ${daySelectionInputText} valgt`;
};

export const MealPlanDrawer: FC<MealPlanDrawerProps> = ({ children }) => {
  const [view, setView] = useState<MealDrawerView>('preview');

  const isPreviewView = view === 'preview';

  const handleViewChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const viewValue = e.currentTarget.value as MealDrawerView;
    setView(viewValue);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className='px-3'>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>Fredag 9.1</DrawerTitle>
          </DrawerHeader>
          <ChangeMealDrawerView onChangeView={handleViewChange} isPreviewView={isPreviewView} />
          {isPreviewView ? <MealPreview /> : <EditMealForm />}
          {!isPreviewView && (
            <DrawerFooter className='flex items-center my-4'>
              <DrawerClose asChild>
                <Button variant='outline'>Luk</Button>
              </DrawerClose>
              <Button>Gem</Button>
            </DrawerFooter>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const MealPreview: FC = () => {
  return (
    <div className='flex flex-col my-4'>
      <h3 className='text-lg'>Madplan detaljer</h3>
      <Item variant='outline' asChild className='p-2'>
        <Link to={`/recipes`}>
          <ItemContent>
            <ItemTitle>Korteletter i fad</ItemTitle>
          </ItemContent>
          <ItemActions>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </ItemActions>
        </Link>
      </Item>
      <DrawerClose asChild>
        <Button className='mt-4' variant='outline'>
          Luk
        </Button>
      </DrawerClose>
    </div>
  );
};

const EditMealForm: FC = () => {
  const [selected, setSelected] = useState<Date[]>();

  return (
    <form className='flex flex-col gap-4 mt-4'>
      <Input name='name' id='name' label='Navn' placeholder='Wraps i ovn' />
      <MealSelect
        id='selectRecipe'
        label='Knyt til opkrift'
        placeholder='Vælg opkrift'
        onValueChange={(id) => console.log(id)}
      />
      <Popover
        align='left'
        trigger={
          <Input
            label='Kopier til øvrige dage'
            placeholder='Vælg dag(e)'
            value={getDaySelectionInputText(selected?.length ?? 0)}
            readOnly
          />
        }
      >
        <Calendar
          locale={da}
          mode='multiple'
          selected={selected}
          onSelect={setSelected}
          className='rounded-lg border'
        />
      </Popover>
    </form>
  );
};
