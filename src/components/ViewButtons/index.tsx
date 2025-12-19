import { FC } from 'react';

interface ViewButtonsProps {
  isDenseView: boolean;
  onChangeView: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ViewButtons: FC<ViewButtonsProps> = ({ isDenseView, onChangeView }) => {
  return (
    <div className='flex items-center gap-2'>
      <button value='list' className={`${isDenseView ? 'font-semibold' : ''}`} onClick={onChangeView}>
        List
      </button>
      <button value='grid' className={`${!isDenseView ? 'font-semibold' : ''}`} onClick={onChangeView}>
        Grid
      </button>
    </div>
  );
};
