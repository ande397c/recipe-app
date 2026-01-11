import { FC } from 'react';
import clsx from 'clsx';

type PillVariant = 'primary' | 'secondary' | 'accent' | 'muted' | 'neutral' | 'destructive';

interface PillProps {
  text: string;
  variant?: PillVariant;
  truncate?: boolean;
  className?: string;
}

export const Pill: FC<PillProps> = ({ text, variant = 'neutral', truncate = false, className }) => {
  return (
    <div
      className={clsx(
        'inline-flex max-w-full items-center rounded-2xl px-2 py-1 text-xs font-medium border',

        truncate && 'truncate whitespace-nowrap',

        {
          'bg-background text-foreground border-border': variant === 'neutral',

          'bg-muted text-muted-foreground border-border': variant === 'muted',

          'bg-secondary text-secondary-foreground border-border': variant === 'secondary',

          'bg-primary text-primary-foreground border-primary': variant === 'primary',

          'bg-accent text-accent-foreground border-accent': variant === 'accent',

          'bg-destructive text-destructive-foreground border-destructive': variant === 'destructive'
        },

        className
      )}
      title={truncate ? text : undefined}
    >
      {text}
    </div>
  );
};
