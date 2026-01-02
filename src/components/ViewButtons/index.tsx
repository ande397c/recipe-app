import { FC } from 'react';
import { ButtonGroup } from '@/components/shadcn/button-group';
import { Button } from '@/components/shadcn/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGrip } from '@fortawesome/free-solid-svg-icons';

interface ViewButtonsProps {
  isDenseView: boolean;
  onChangeView: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ViewButtons: FC<ViewButtonsProps> = ({ isDenseView, onChangeView }) => {
  return (
    <ButtonGroup>
      <Button
        variant={isDenseView ? 'outline' : 'ghost'}
        size='icon'
        value='list'
        onClick={onChangeView}
      >
        <FontAwesomeIcon size='lg' icon={faBars} />
      </Button>
      <Button
        variant={!isDenseView ? 'outline' : 'ghost'}
        size='icon'
        value='grid'
        onClick={onChangeView}
      >
        <FontAwesomeIcon size='lg' icon={faGrip} />
      </Button>
    </ButtonGroup>
  );
};


