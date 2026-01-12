import { FC } from 'react';
import clsx from 'clsx';
import { IconButton } from '@/components/IconButton';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MealPlanDrawer } from '../MealPlanDrawer';

interface DayCardProps {
  planned: boolean;
  topHeading: string;
  mealName: string;
}

export const DayCard: FC<DayCardProps> = ({ planned, topHeading, mealName }) => {
  return (
    <li
      className={clsx('rounded-md px-2 py-1 border transition-colors', {
        'border-emerald-300 bg-emerald-50': planned,
        'border-stone-200 border-dashed bg-stone-50/70': !planned
      })}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span
            className={clsx('h-2 w-2 rounded-full', planned ? 'bg-emerald-500' : 'bg-stone-300')}
          />
          <p className='text-sm'>{topHeading.toUpperCase()}</p>
        </div>

        <MealPlanDrawer>
          <IconButton
            icon={planned ? faPen : faPlus}
            className={clsx('h-9 w-9', {
              'text-emerald-600': planned,
              'text-stone-400': !planned
            })}
          />
        </MealPlanDrawer>
      </div>

      <p className={clsx(planned ? 'text-stone-700' : 'text-stone-600')}>
        {planned ? mealName : 'Ikke planlagt'}
      </p>
    </li>
  );
};
