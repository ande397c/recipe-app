import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { FC } from 'react';

interface ChangeMealDrawerViewProps {
  isNewPlan: boolean
  isPreviewView: boolean;
  onChangeView: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ChangeMealDrawerView: FC<ChangeMealDrawerViewProps> = ({
  isNewPlan,
  isPreviewView,
  onChangeView
}) => {
  return (
    <ButtonGroup className='w-full grid-cols-2'>
      <Button        
        className='w-full'
        variant={isPreviewView ? 'outline' : 'ghost'}
        onClick={onChangeView}
        value='preview'
      >
        Forhåndsvisning
      </Button>
      <Button
        className='w-full'
        variant={!isPreviewView ? 'outline' : 'ghost'}
        onClick={onChangeView}
        value='edit'
      >
        {!isNewPlan ? 'Tilføj' : 'Rediger'}
      </Button>
    </ButtonGroup>
  );
};
