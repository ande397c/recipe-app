import { ButtonHTMLAttributes, FC } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconDefinition;
}

export const IconButton: FC<IconButtonProps> = ({ icon, ...props }) => {
  return (
    <button
      {...props}
      className='bg-white h-8 w-8 flex justify-center items-center rounded-full p-4'
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
