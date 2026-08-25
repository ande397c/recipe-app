import { faMagnifyingGlass, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

interface EmptyProps {
  icon?: IconDefinition;
  title: string;
  description?: string;
}

export const Empty: FC<EmptyProps> = ({ icon, title, description }) => {
  return (
    <div className='justify-self-center'>
      <div className='flex flex-col items-center gap-1'>
        <FontAwesomeIcon icon={icon || faMagnifyingGlass} size='2x' />
        {title && <h4 className='text-black text-base'>{title}</h4>}
        {description && <p className='text-muted-foreground text-sm'>{description}</p>}
      </div>
    </div>
  );
};
