import { forwardRef } from 'react';
import { cn } from '@/utils/mergeClasses';
import { SelectSeparator } from '@radix-ui/react-select';

export const SelectActionItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    onSelect: () => void;
  }
>(({ className, onSelect, children, ...props }, ref) => {
  return (
    <div className='sticky bottom-0 bg-white z-10'>
      <SelectSeparator />

      <div
        ref={ref}
        role='button'
        tabIndex={0}
        onClick={onSelect}
        className={cn(
          'flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm',
          'hover:bg-accent hover:text-accent-foreground',
          'focus:bg-accent focus:text-accent-foreground',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
});
