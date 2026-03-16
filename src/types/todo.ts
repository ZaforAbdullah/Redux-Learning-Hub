/**
 * TODO TYPE DEFINITIONS
 * =====================
 * Shared types for the todos feature.
 * Keeping types in a separate file promotes reusability.
 */

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
  tags: string[];
}

export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'createdAt' | 'priority' | 'alphabetical';
