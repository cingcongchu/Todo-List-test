import type { Todo, CreateTodoInput, UpdateTodoInput } from '@/types/todo';
import { API_ENDPOINTS, ERROR_MESSAGES } from '@/constants';
import { parseJsonResponse } from '@/lib/utils';

export async function fetchTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(API_ENDPOINTS.TODOS);
    return await parseJsonResponse<Todo[]>(response);
  } catch (error) {
    console.error('API Error - fetchTodos:', error);
    throw new Error(ERROR_MESSAGES.FETCH_FAILED);
  }
}

export async function createTodo(data: CreateTodoInput): Promise<Todo> {
  try {
    const response = await fetch(API_ENDPOINTS.TODOS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description || undefined,
        startDate: data.startDate || undefined,
        deadline: data.deadline || undefined,
      }),
    });

    return await parseJsonResponse<Todo>(response);
  } catch (error) {
    console.error('API Error - createTodo:', error);
    throw new Error(ERROR_MESSAGES.CREATE_FAILED);
  }
}

export async function updateTodo(id: number, data: UpdateTodoInput): Promise<Todo> {
  try {
    const response = await fetch(API_ENDPOINTS.TODO_BY_ID(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await parseJsonResponse<Todo>(response);
  } catch (error) {
    console.error('API Error - updateTodo:', error);
    throw new Error(ERROR_MESSAGES.UPDATE_FAILED);
  }
}

export async function toggleTodoComplete(
  id: number,
  completed: boolean
): Promise<Todo> {
  return updateTodo(id, { completed });
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    const response = await fetch(API_ENDPOINTS.TODO_BY_ID(id), {
      method: 'DELETE',
    });

    if (!response.ok) {
      await parseJsonResponse(response);
    }
  } catch (error) {
    console.error('API Error - deleteTodo:', error);
    throw new Error(ERROR_MESSAGES.DELETE_FAILED);
  }
}

export async function fetchTodoById(id: number): Promise<Todo | null> {
  try {
    const response = await fetch(API_ENDPOINTS.TODO_BY_ID(id));
    
    if (response.status === 404) {
      return null;
    }

    return await parseJsonResponse<Todo>(response);
  } catch (error) {
    console.error('API Error - fetchTodoById:', error);
    throw new Error(ERROR_MESSAGES.FETCH_FAILED);
  }
}
