import { MobileNavBar } from '@/components/MobileNavBar';

export interface MainLayoutProps {
  title?: string;
  action?: React.ReactNode;
  spacing?: number;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  title,
  action,
  spacing = 0,
  children
}) => {
  return (
    <main className='mb-[70px]'>
      <title>{title}</title>
      <div className={`flex flex-col gap-${spacing} gap-2 p-4`}>
        {action}
        {title && <h1 className='text-2xl font-bold'>{title}</h1>}
        {children}
      </div>
      <MobileNavBar />
    </main>
  );
};
