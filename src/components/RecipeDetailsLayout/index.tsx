import { MobileNavBar } from '@/components/MobileNavBar';
import { MainLayoutProps } from '../MainLayout';

interface RecipeDetailsLayoutProps extends MainLayoutProps {
  backgroundImg?: string;
}

export const RecipeDetailsLayout: React.FC<RecipeDetailsLayoutProps> = ({
  title,
  spacing = 0,
  backgroundImg,
  action,
  children
}) => {
  return (
    <main className='relative'>
      <title>{title}</title>

      {backgroundImg ? (
        <div className='relative w-full'>
          <img src={backgroundImg} alt='' className='w-full h-56 object-cover' />

          {action && <div className='absolute top-0 left-0 p-4 w-full'>{action}</div>}
        </div>
      ) : (
        action && <div className='p-4 pb-0'>{action}</div>
      )}

      <div className={`flex flex-col gap-${spacing} gap-4 p-4`}>
        {title && <h1 className='text-2xl font-bold'>{title}</h1>}
        {children}
      </div>

      <MobileNavBar />
    </main>
  );
};
