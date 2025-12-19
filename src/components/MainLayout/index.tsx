import { MobileNavBar } from '@/components/MobileNavBar';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface MainLayoutProps {
  title?: string;
  displayBackButton?: boolean;
  spacing?: number;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  title,
  displayBackButton,
  spacing = 0,
  children
}) => {
  return (
    <main>
      <title>{title}</title>
      <div className={`flex flex-col gap-${spacing} gap-2 p-4`}>
        {displayBackButton && (
          <button className='self-baseline p-4' onClick={() => window.history.back()}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        )}
        {title && <h1 className='text-2xl font-bold'>{title}</h1>}
        {children}
      </div>
      <MobileNavBar />
    </main>
  );
};
