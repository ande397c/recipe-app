import { ButtonHTMLAttributes, FC } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconDefinition;
}

export const IconButton: FC<IconButtonProps> = ({ icon, className, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        'bg-white h-8 w-8 flex items-center justify-center rounded-full',
        'p-2',
        className
      )}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
