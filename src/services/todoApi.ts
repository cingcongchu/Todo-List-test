/**
 * API Service Layer
 * Handles all API calls for the Todo application
 * Provides centralized error handling and request configuration
 */

import type { Todo, CreateTodoInput, UpdateTodoInput } from '@/types/todo';
import { API_ENDPOINTS, ERROR_MESSAGES } from '@/constants';
import { parseJsonResponse } from '@/lib/utils';

/**
 * Fetches all todos from the API
 * @returns Promise with array of todos
 * @throws Error if fetch fails
 */
export async function fetchTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(API_ENDPOINTS.TODOS);
    return await parseJsonResponse<Todo[]>(response);
  } catch (error) {
    console.error('API Error - fetchTodos:', error);
    throw new Error(ERROR_MESSAGES.FETCH_FAILED);
  }
}

/**
 * Creates a new todo
 * @param data - Todo data to create
 * @returns Promise with created todo
 * @throws Error if creation fails
 */
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

/**
 * Updates an existing todo
 * @param id - Todo ID to update
 * @param data - Partial todo data to update
 * @returns Promise with updated todo
 * @throws Error if update fails
 */
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

/**
 * Toggles the completion status of a todo
 * @param id - Todo ID
 * @param completed - New completion status
 * @returns Promise with updated todo
 * @throws Error if toggle fails
 */
export async function toggleTodoComplete(
  id: number,
  completed: boolean
): Promise<Todo> {
  return updateTodo(id, { completed });
}

/**
 * Deletes a todo
 * @param id - Todo ID to delete
 * @returns Promise indicating success
 * @throws Error if deletion fails
 */
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

/**
 * Fetches a single todo by ID
 * @param id - Todo ID
 * @returns Promise with todo or null if not found
 * @throws Error if fetch fails
 */
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
