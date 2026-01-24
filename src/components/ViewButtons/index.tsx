import { FC } from 'react';
import { ButtonGroup } from '@/components/shadcn/button-group';
import { Button } from '@/components/shadcn/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGrip } from '@fortawesome/free-solid-svg-icons';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { View } from '@/constants';

interface ViewButtonsProps {
  isDenseView: boolean;
  onViewChange: (view: View) => void;
}

export const ViewButtons: FC<ViewButtonsProps> = ({ isDenseView, onViewChange }) => {
  const { setItem } = useLocalStorage('view');

  const handleViewChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const viewValue = e.currentTarget.value as View;
    setItem(viewValue);
    onViewChange(viewValue);
  };

  return (
    <ButtonGroup>
      <Button
        variant={isDenseView ? 'outline' : 'ghost'}
        size='icon'
        value='list'
        onClick={handleViewChange}
      >
        <FontAwesomeIcon size='lg' icon={faBars} />
      </Button>
      <Button
        variant={!isDenseView ? 'outline' : 'ghost'}
        size='icon'
        value='grid'
        onClick={handleViewChange}
      >
        <FontAwesomeIcon size='lg' icon={faGrip} />
      </Button>
    </ButtonGroup>
  );
};
