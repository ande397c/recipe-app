import { FC } from 'react';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGrip } from '@fortawesome/free-solid-svg-icons';

interface ViewButtonsProps {
  isDenseView: boolean;
  onChangeView: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ViewButtons: FC<ViewButtonsProps> = ({ isDenseView, onChangeView }) => {
  return (
    <ButtonGroup>
      <Button variant={isDenseView ? 'outline' : 'ghost'} size='icon' value='list' onClick={onChangeView}>
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <Button variant={!isDenseView ? 'outline' : 'ghost'} size='icon' value='grid' onClick={onChangeView}>
        <FontAwesomeIcon icon={faGrip} />
      </Button>
    </ButtonGroup>
  );
};


