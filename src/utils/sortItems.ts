type Checkable = {
  is_checked: boolean;
};

export const sortItemsUncheckedFirst = <T extends Checkable>(items: T[] | undefined): T[] => {
  if (!items) return [];

  return [...items].sort((a, b) => {
    if (a.is_checked && !b.is_checked) {
      return 1;
    }
    if (!a.is_checked && b.is_checked) {
      return -1;
    }
    return 0;
  });
};
