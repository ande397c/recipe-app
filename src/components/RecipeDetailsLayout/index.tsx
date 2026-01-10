import clsx from 'clsx';
import { MobileNavBar } from '@/components/MobileNavBar';
import { MainLayoutProps } from '../MainLayout';
import { FC, ReactNode } from 'react';

interface RecipeDetailsLayoutProps extends MainLayoutProps {
  backgroundImg?: string;
  action: ReactNode;
  meta: ReactNode;
}

export const RecipeDetailsLayout: FC<RecipeDetailsLayoutProps> = ({
  title,
  backgroundImg,
  action,
  meta,
  children
}) => {
  const hasHero = Boolean(backgroundImg);
  console.log({ meta });

  return (
    <main className='relative'>
      <title>{title}</title>

      <div className={clsx({ 'relative w-full': hasHero })}>
        {hasHero && <img src={backgroundImg} alt='' className='w-full h-56 object-cover' />}

        {action && (
          <div
            className={clsx('flex flex-col gap-2', {
              'absolute top-0 left-0 w-full p-4': hasHero,
              'p-4 pb-0': !hasHero
            })}
          >
            {action}
          </div>
        )}
      </div>

      <div className='flex flex-col gap-4 p-4'>
        {title && (
          <div>
            {meta}
            <h1 className='text-2xl font-bold'>{title}</h1>
          </div>
        )}
        {children}
      </div>

      <MobileNavBar />
    </main>
  );
};
