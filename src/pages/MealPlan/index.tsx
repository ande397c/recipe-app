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
import { CARD_HEADING_FORMAT_OPTIONS, WEEKDAYS_FORMAT_OPTIONS } from './lib/dateFormats';

interface ButtonNavigationProps {
  currentDay: Date;
  onGoBack: () => void;
  onGoForward: () => void;
}

const getFormattedWeekdays = (weekDays: Date[]): string[] =>
  weekDays.map((day) => day.toLocaleDateString('da-DK', WEEKDAYS_FORMAT_OPTIONS));

const today = new Date();

export const MealPlan: FC = () => {
  const { data: mealPlans = [] } = useFetchMealPlans();
  const [day, setDay] = useState<Date>(today);

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
          const plannedMeal = mealPlans.find((meal) => isSameCalendarDay(day, meal.plan_date));
          const isToday = isSameCalendarDay(day, today);
          return (
            <DayCard
              key={day.toISOString()}
              id={plannedMeal ? plannedMeal.id : undefined}
              date={day}
              topHeading={day.toLocaleDateString('da-DK', CARD_HEADING_FORMAT_OPTIONS)}
              planned={!!plannedMeal}
              isToday={isToday}
              mealName={plannedMeal?.plan_name ?? 'Ikke planlagt'}
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
