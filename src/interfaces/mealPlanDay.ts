export interface MealPlanDay {
  id: number;
  name: string | null
  date: string;
}

// Mock
export const mealPlanMock: MealPlanDay[] = [
  { id: Math.random(), date: '2025-12-04 20:24:41.971003+00', name: 'Fried rice' },
  { id: Math.random(), date: '2025-11-23 20:24:41.971003+00', name: 'Korteletter' },
  { id: Math.random(), date: '2025-12-24 20:24:41.971003+00', name: 'Fried rice' },
  { id: Math.random(), date: '2026-01-11 20:24:41.971003+00', name: 'Wraps' }
];
