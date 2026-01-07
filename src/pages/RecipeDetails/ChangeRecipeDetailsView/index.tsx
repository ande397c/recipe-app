import { Button } from '@/components/shadcn/button';
import { ButtonGroup } from '@/components/shadcn/button-group';
import { FC } from 'react';

interface ChangeRecipeDetailsViewProps {
  isStepView: boolean;
  onChangeView: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ChangeRecipeDetailsView: FC<ChangeRecipeDetailsViewProps> = ({
  isStepView,
  onChangeView
}) => {
  return (
    <ButtonGroup className='w-full grid-cols-2'>
      <Button
        className='w-full'
        variant={isStepView ? 'outline' : 'ghost'}
        onClick={onChangeView}
        value='steps'
      >
        Fremgangsmåde
      </Button>
      <Button
        className='w-full'
        variant={!isStepView ? 'outline' : 'ghost'}
        onClick={onChangeView}
        value='ingredients'
      >
        Ingredienser
      </Button>
    </ButtonGroup>
  );
};
