import { motion, PanInfo } from 'framer-motion';
import { FC, ReactNode, useRef, useState } from 'react';

const SWIPE_THRESHOLD = 60;
const DEFAULT_ACTION_WIDTH = 96;

interface ActionSwipeProps {
  enableDrag?: boolean;
  open?: boolean;
  actionWidth?: number;
  children: ReactNode;
  actions: (helpers: { close: () => void }) => ReactNode;
  onOpenChange?: (open: boolean) => void;
}


export const ActionSwipe: FC<ActionSwipeProps> = ({
  enableDrag = true,
  actionWidth = DEFAULT_ACTION_WIDTH,
  children,
  actions,
  open: controlledOpen,
  onOpenChange
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const isDragging = useRef(false);

  const setOpen = (value: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(value);
    }
    onOpenChange?.(value);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDragging.current = false;
    setOpen(info.offset.x < -SWIPE_THRESHOLD);
  };

  return (
    <div className='relative overflow-hidden rounded-md'>
      <div className='absolute inset-y-0 right-[3px] p-0.5 flex'>
        {actions({ close: () => setOpen(false) })}
      </div>

      <motion.div
        drag={enableDrag ? 'x' : false}
        dragConstraints={{ left: -actionWidth, right: 0 }}
        dragElastic={0.1}
        animate={{ x: open ? -actionWidth : 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onDragStart={() => (isDragging.current = true)}
        onDragEnd={handleDragEnd}
        className='relative bg-white touch-pan-y'
      >
        <div
          onClickCapture={(e) => {
            if (isDragging.current) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};
