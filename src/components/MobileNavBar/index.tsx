import { NavLink } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faList, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { clsx } from 'clsx';

export const MobileNavBar: React.FC = () => {
  const menuItems = [
    { icon: faList, href: '/grocery-lists', label: 'Indkøbslister' },
    { icon: faUtensils, href: '/recipes', label: 'Opskrifter' },
    { icon: faCalendarDays, href: '/meal-plans', label: 'Madplaner' }
  ];

  return (
    <nav className='fixed bottom-0 w-full bg-neutral-800 border p-2.5'>
      <ul className='flex justify-evenly gap-6'>
        {menuItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            children={({ isActive }) => (
              <div
                className={clsx('flex justify-center items-center flex-col', {
                  'text-gray-400': !isActive,
                  'text-amber-600': isActive
                })}
              >
                <FontAwesomeIcon icon={item.icon} size='lg' />
                <span>{item.label}</span>
              </div>
            )}
          />
        ))}
      </ul>
    </nav>
  );
};
