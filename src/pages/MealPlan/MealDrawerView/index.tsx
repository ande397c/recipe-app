import { Button } from '@/components/shadcn/button';
import { ButtonGroup } from '@/components/shadcn/button-group';
import { FC } from 'react';

interface ChangeMealDrawerViewProps {
  isPreviewView: boolean;
  onChangeView: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ChangeMealDrawerView: FC<ChangeMealDrawerViewProps> = ({
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
        Rediger
      </Button>
    </ButtonGroup>
  );
};
