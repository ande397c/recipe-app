import { Children, FC, ReactNode } from 'react';
import { Empty } from '../Empty';

interface CardListContainerProps {
  isDenseView?: boolean;
  children: ReactNode;
}

export const CardListContainer: FC<CardListContainerProps> = ({ children }) => {
  const noChildren = !children || Children.count(children) === 1;
  return (
    <>
      {noChildren && <Empty title='Ingen resultater fundet' />}
      <ul className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-12'>{children}</ul>
    </>
  );
};
