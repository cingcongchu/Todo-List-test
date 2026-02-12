/**
 * Constants for the Todo application
 * Centralized configuration values
 */

/**
 * Date formatting options for Indonesian locale
 */
export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

/**
 * Default locale for date formatting
 */
export const DEFAULT_LOCALE = 'id-ID';

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  TODOS: '/api/todos',
  TODO_BY_ID: (id: number) => `/api/todos/${id}`,
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch todos',
  CREATE_FAILED: 'Failed to create todo',
  UPDATE_FAILED: 'Failed to update todo',
  DELETE_FAILED: 'Failed to delete todo',
  INVALID_ID: 'Invalid todo ID',
  NOT_FOUND: 'Todo not found',
  NETWORK_ERROR: 'Network error occurred',
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  TODO_CREATED: 'Todo created successfully',
  TODO_UPDATED: 'Todo updated successfully',
  TODO_DELETED: 'Todo deleted successfully',
} as const;

/**
 * UI labels
 */
export const UI_LABELS = {
  ACTIVE_TASKS: 'Active Tasks',
  COMPLETED_TASKS: 'Completed Tasks',
  ADD_NEW_TODO: 'Add New Todo',
  NO_ACTIVE_TASKS: 'No active tasks. Add one above!',
  NO_COMPLETED_TASKS: 'No completed tasks yet.',
  START_DATE: 'Start Date',
  DEADLINE: 'Deadline',
  TITLE_PLACEHOLDER: 'Todo title...',
  DESCRIPTION_PLACEHOLDER: 'Description (optional)...',
  TOTAL: 'Total',
  COMPLETED: 'Completed',
  ACTIVE: 'Active',
  SAVE: 'Save',
  CANCEL: 'Cancel',
  DELETE_CONFIRM: 'Are you sure you want to delete this todo?',
} as const;

/**
 * Button labels
 */
export const BUTTON_LABELS = {
  ADD_TODO: 'Add Todo',
  ADDING: 'Adding...',
  MARK_COMPLETE: 'Mark complete',
  MARK_INCOMPLETE: 'Mark incomplete',
  EDIT: 'Edit',
  DELETE: 'Delete',
} as const;
