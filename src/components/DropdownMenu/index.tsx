import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import clsx from 'clsx';
import { useRef, useState } from 'react';

export interface MenuItem {
  label: string;
  isDisabled?: boolean;
  icon: IconDefinition;
  color?: 'current' | 'danger';
  onClick: () => void;
}

interface DropdownMenuProps {
  menuItems: MenuItem[];
  children?: React.ReactNode;
}

export const DropdownMenu = ({ menuItems, children }: DropdownMenuProps) => {
  const dropDownMenuRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick({ ref: dropDownMenuRef, callback: () => setIsOpen(false) });
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenuOpen = () => setIsOpen((prev) => !prev);

  const handleItemClick = (item: MenuItem) => {
    toggleMenuOpen();
    item?.onClick();
  };

  return (
    <div ref={dropDownMenuRef} className='relative'>
      <div className='p-2' onClick={toggleMenuOpen}>
        {children}
      </div>
      {isOpen && (
        <div className='absolute right-0 w-56 bg-white border border-gray-300 text-sm rounded-lg shadow-lg z-10'>
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={clsx({
                  'px-4 py-2': true,
                  'text-red-500': item.color === 'danger',
                  'text-black': item.color === 'current' || !item.color,
                  'text-gray-300 cursor-not-allowed ': item.isDisabled,
                  'hover:bg-gray-100 cursor-pointer': !item.isDisabled
                })}
                onClick={() => handleItemClick(item)}
              >
                <FontAwesomeIcon icon={item.icon} className='mr-4' />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
