import { FC, useState } from 'react';
import { getCurrentWeekDays } from './utils/getIsoWeekDays';
import { getISOWeek } from './utils/getIsoWeekNumber';
import { MainLayout } from '@/components/MainLayout';
import { IconButton } from '@/components/IconButton';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { uppercaseFirstLetter } from '@/utils/uppercaseFirstLetter';
import { DayCard } from './DayCard';
import { isSameCalendarDay } from './utils/isSameDate';
import { useFetchMealPlans } from '@/services/MealPlans/useFetchMealPlans';

interface ButtonNavigationProps {
  currentDay: Date;
  onGoBack: () => void;
  onGoForward: () => void;
}

const getFormattedWeekdays = (weekDays: Date[]): string[] =>
  weekDays.map((day) =>
    day.toLocaleDateString('da-DK', {
      weekday: 'short',
      day: '2-digit',
      month: 'numeric'
    })
  );

export const MealPlan: FC = () => {
  const { data: mealPlans = [] } = useFetchMealPlans();
  const [day, setDay] = useState<Date>(new Date());

  const weekDays = getCurrentWeekDays(day);

  const goBack = () => {
    setDay((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  };

  const goForward = () => {
    setDay((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  return (
    <MainLayout title='Madplaner' spacing={4}>
      <ButtonNavigation currentDay={day} onGoBack={goBack} onGoForward={goForward} />
      <ul className='grid grid-cols-1 gap-4'>
        {weekDays.map((day) => {
          const isPlanned = mealPlans.find((meal) => isSameCalendarDay(day, meal.created_at));
          return (
            <DayCard
              key={day.toISOString()}
              topHeading={day.toLocaleDateString('da-DK', {
                weekday: 'long',
                day: 'numeric',
                month: 'numeric'
              })}
              planned={!!isPlanned}
              mealName={isPlanned?.name ?? 'Ikke planlagt'}
            />
          );
        })}
      </ul>
    </MainLayout>
  );
};

const ButtonNavigation: FC<ButtonNavigationProps> = ({ currentDay, onGoBack, onGoForward }) => {
  const weekNumber = getISOWeek(currentDay);
  const weekDays = getCurrentWeekDays(currentDay);
  const formattedWeekdays = getFormattedWeekdays(weekDays);

  const firstDay = formattedWeekdays[0];
  const lastDay = formattedWeekdays[formattedWeekdays.length - 1];

  return (
    <div className='flex items-center justify-between gap-4'>
      <IconButton onClick={onGoBack} className='hover:bg-gray-200 h-10 w-10' icon={faAngleLeft} />
      <p className='font-semibold'>
        Uge: {weekNumber}{' '}
        <span className='font-normal text-foreground'>
          | {uppercaseFirstLetter(firstDay)} - {uppercaseFirstLetter(lastDay)}
        </span>
      </p>
      <IconButton
        onClick={onGoForward}
        className='hover:bg-gray-200 h-10 w-10'
        icon={faAngleRight}
      />
    </div>
  );
};
