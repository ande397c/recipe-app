export const isSameCalendarDay = (a: Date | string | null, b: Date | string | null): boolean => {
  if (a === null || b === null) {
    return false;
  }
  const dateA = typeof a === 'string' ? new Date(a) : a;
  const dateB = typeof b === 'string' ? new Date(b) : b;

  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
};
