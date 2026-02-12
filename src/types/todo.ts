/**
 * Shared types for the Todo application
 * Centralized type definitions to ensure consistency across the app
 */

/**
 * Base Todo interface - represents the data structure from the database
 */
export interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  startDate: string | null;
  deadline: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Todo form data - used for creating new todos
 * Omits auto-generated fields (id, createdAt, updatedAt)
 */
export interface CreateTodoInput {
  title: string;
  description?: string | null;
  startDate?: string | null;
  deadline?: string | null;
}

/**
 * Todo update input - partial type for updating existing todos
 * All fields are optional for partial updates
 */
export interface UpdateTodoInput {
  title?: string;
  description?: string | null;
  completed?: boolean;
  startDate?: string | null;
  deadline?: string | null;
}

/**
 * API Response types
 */
export interface ApiError {
  error: string;
}

export interface ApiSuccess {
  message: string;
}

/**
 * Todo state for form editing
 * Uses null for date fields to match input[type="date"] behavior
 */
export interface TodoFormData {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  startDate: string | null;
  deadline: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Todo filters
 */
export interface TodoFilters {
  showCompleted: boolean;
  showActive: boolean;
}
