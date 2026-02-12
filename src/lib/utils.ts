import { DEFAULT_LOCALE, DATE_FORMAT_OPTIONS } from '@/constants';

export function formatDate(date: Date | string | null): string | null {
  if (!date) return null;
  return new Date(date).toLocaleDateString(DEFAULT_LOCALE, DATE_FORMAT_OPTIONS);
}

export function extractDatePart(isoDate: string | null): string | null {
  if (!isoDate) return null;
  return isoDate.split('T')[0];
}

export function isValidDate(dateString: string | null): boolean {
  if (!dateString) return true;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function filterTodosByStatus<T extends { completed: boolean }>(
  todos: T[],
  completed: boolean
): T[] {
  return todos.filter((todo) => todo.completed === completed);
}

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

export async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

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
