import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

interface EmptyProps {
  title?: string;
  description?: string;
}

export const Empty: FC<EmptyProps> = ({ title, description }) => {
  return (
    <div className='justify-self-center'>
      <div className='flex flex-col items-center gap-2'>
        <FontAwesomeIcon icon={faMagnifyingGlass} size='2x' />
        {title && <h4 className='text-black'>{title}</h4>}
        {description && <p className='text-muted-foreground'>{description}</p>}
      </div>
    </div>
  );
};
