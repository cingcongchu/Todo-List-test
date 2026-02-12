/**
 * Custom React Hook for managing Todo state and operations
 * Provides centralized state management for CRUD operations
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Todo, CreateTodoInput, UpdateTodoInput, TodoFormData } from '@/types/todo';
import {
  fetchTodos,
  createTodo as apiCreateTodo,
  updateTodo as apiUpdateTodo,
  deleteTodo as apiDeleteTodo,
  toggleTodoComplete as apiToggleComplete,
} from '@/services/todoApi';
import { filterTodosByStatus, getTodoStats, extractDatePart } from '@/lib/utils';

interface UseTodosReturn {
  // State
  todos: Todo[];
  loading: boolean;
  error: string | null;
  editingTodo: TodoFormData | null;
  
  // Derived state
  activeTodos: Todo[];
  completedTodos: Todo[];
  stats: ReturnType<typeof getTodoStats<Todo>>;
  
  // Actions
  refreshTodos: () => Promise<void>;
  createTodo: (data: CreateTodoInput) => Promise<void>;
  updateTodo: (id: number, data: UpdateTodoInput) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleComplete: (todo: Todo) => Promise<void>;
  setEditingTodo: (todo: TodoFormData | null) => void;
  startEditing: (todo: Todo) => void;
  cancelEditing: () => void;
}

export function useTodos(): UseTodosReturn {
  // Core state
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodoState] = useState<TodoFormData | null>(null);

  // Derived state
  const activeTodos = filterTodosByStatus(todos, false);
  const completedTodos = filterTodosByStatus(todos, true);
  const stats = getTodoStats(todos);

  /**
   * Fetches todos from API
   */
  const refreshTodos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Creates a new todo
   */
  const createTodo = useCallback(async (data: CreateTodoInput) => {
    setLoading(true);
    setError(null);

    try {
      await apiCreateTodo(data);
      await refreshTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [refreshTodos]);

  /**
   * Updates an existing todo
   */
  const updateTodo = useCallback(async (id: number, data: UpdateTodoInput) => {
    setLoading(true);
    setError(null);

    try {
      await apiUpdateTodo(id, data);
      setEditingTodoState(null);
      await refreshTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [refreshTodos]);

  /**
   * Deletes a todo
   */
  const deleteTodo = useCallback(async (id: number) => {
    setError(null);

    try {
      await apiDeleteTodo(id);
      await refreshTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      throw err;
    }
  }, [refreshTodos]);

  /**
   * Toggles todo completion status
   */
  const toggleComplete = useCallback(async (todo: Todo) => {
    setError(null);

    try {
      await apiToggleComplete(todo.id, !todo.completed);
      await refreshTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle todo');
      throw err;
    }
  }, [refreshTodos]);

  /**
   * Sets the todo being edited
   */
  const setEditingTodo = useCallback((todo: TodoFormData | null) => {
    setEditingTodoState(todo);
  }, []);

  /**
   * Starts editing a todo with proper date formatting
   */
  const startEditing = useCallback((todo: Todo) => {
    setEditingTodoState({
      ...todo,
      startDate: extractDatePart(todo.startDate),
      deadline: extractDatePart(todo.deadline),
    });
  }, []);

  /**
   * Cancels editing mode
   */
  const cancelEditing = useCallback(() => {
    setEditingTodoState(null);
  }, []);

  // Initial fetch
  useEffect(() => {
    refreshTodos();
  }, [refreshTodos]);

  return {
    todos,
    loading,
    error,
    editingTodo,
    activeTodos,
    completedTodos,
    stats,
    refreshTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    setEditingTodo,
    startEditing,
    cancelEditing,
  };
}
