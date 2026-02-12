/**
 * Utility functions for the Todo application
 */

import { DEFAULT_LOCALE, DATE_FORMAT_OPTIONS } from '@/constants';

/**
 * Formats a date for display
 * @param date - Date string, Date object, or null
 * @returns Formatted date string or null if date is invalid
 */
export function formatDate(date: Date | string | null): string | null {
  if (!date) return null;
  return new Date(date).toLocaleDateString(DEFAULT_LOCALE, DATE_FORMAT_OPTIONS);
}

/**
 * Extracts date portion (YYYY-MM-DD) from ISO date string
 * @param isoDate - ISO date string or null
 * @returns Date string in YYYY-MM-DD format or null
 */
export function extractDatePart(isoDate: string | null): string | null {
  if (!isoDate) return null;
  return isoDate.split('T')[0];
}

/**
 * Validates if a string is a valid date
 * @param dateString - String to validate
 * @returns True if valid date string
 */
export function isValidDate(dateString: string | null): boolean {
  if (!dateString) return true; // Null is considered valid (optional)
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

/**
 * Filters todos by completion status
 * @param todos - Array of todos
 * @param completed - Filter by completed status
 * @returns Filtered todos
 */
export function filterTodosByStatus<T extends { completed: boolean }>(
  todos: T[],
  completed: boolean
): T[] {
  return todos.filter((todo) => todo.completed === completed);
}

/**
 * Creates a todo statistics summary
 * @param todos - Array of todos
 * @returns Statistics object
 */
export function getTodoStats<T extends { completed: boolean }>(todos: T[]) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;

  return {
    total,
    completed,
    active,
    progress: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

/**
 * Safely parses JSON with error handling
 * @param response - Fetch response object
 * @returns Parsed JSON or throws error
 */
export async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

/**
 * Creates URLSearchParams from an object
 * @param params - Object with query parameters
 * @returns URLSearchParams instance
 */
export function createQueryParams(
  params: Record<string, string | number | boolean | null | undefined>
): URLSearchParams {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams;
}
