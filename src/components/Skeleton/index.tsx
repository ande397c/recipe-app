import clsx from 'clsx';

interface SkeletonProps {
  shape?: 'rect' | 'square' | 'circle';
  width?: string;
  height?: string;
  size?: string;
  alignCenter?: boolean;
}

export const Skeleton = ({ shape = 'circle', width, height, size, alignCenter }: SkeletonProps) => {
  let defaultClasses = '';
  const style: React.CSSProperties = {};

  if (shape === 'rect') {
    defaultClasses = 'rounded-sm';
    style.width = width || '100%';
    style.height = height || '20px';
    style.margin = alignCenter ? '0 auto' : undefined;
  }

  if (shape === 'square') {
    defaultClasses = 'rounded-sm';
    style.width = width || '100%';
    style.height = height || '160px';
    style.margin = alignCenter ? '0 auto' : undefined;
  }

  if (shape === 'circle') {
    defaultClasses = 'rounded-full';
    const finalSize = size || '48px';
    style.width = finalSize;
    style.height = finalSize;
    style.margin = alignCenter ? '0 auto' : undefined;
  }

  return (
    <div className='animate-pulse'>
      <div className={clsx('bg-gray-300', defaultClasses)} style={style}></div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};
