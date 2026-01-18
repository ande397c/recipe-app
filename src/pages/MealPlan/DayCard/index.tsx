import { FC, useState } from 'react';
import clsx from 'clsx';
import { IconButton } from '@/components/IconButton';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MealPlanDrawer } from '../MealPlanDrawer';

interface DayCardProps {
  id: number | undefined;
  date: Date;
  planned: boolean;
  isToday: boolean;
  topHeading: string;
  mealName: string;
}

export const DayCard: FC<DayCardProps> = ({ id, planned, date, isToday, topHeading, mealName }) => {
  const [displayDrawer, setDisplayDrawer] = useState(false);
  return (
    <>
      {displayDrawer && (
        <MealPlanDrawer id={id} date={date} isOpen={displayDrawer} onClose={() => setDisplayDrawer(false)} />
      )}
      <li
        className={clsx('relative rounded-md px-3 py-2 border transition-colors', {
          'border-black': isToday,
          'bg-emerald-50 border-emerald-200': planned && !isToday,
          'bg-muted/40 border-dashed border-border': !planned && !isToday
        })}
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span
              className={clsx(
                'rounded-full transition-all',
                planned ? 'bg-emerald-500' : 'bg-muted-foreground/40',
                isToday ? 'h-2.5 w-2.5' : 'h-2 w-2'
              )}
            />
            <p
              className={clsx('text-sm tracking-wide', {
                'font-semibold text-foreground': isToday,
                'text-muted-foreground': !isToday
              })}
            >
              {topHeading.toUpperCase()}
            </p>
          </div>
          <IconButton
            onClick={() => setDisplayDrawer(true)}
            icon={planned ? faPen : faPlus}
            className={clsx('h-9 w-9 transition-colors', {
              'text-emerald-600 hover:bg-emerald-100': planned,
              'text-muted-foreground hover:bg-muted': !planned
            })}
          />
        </div>

        <p className={clsx(planned ? 'text-stone-700' : 'text-stone-600')}>{mealName}</p>
      </li>
    </>
  );
};
