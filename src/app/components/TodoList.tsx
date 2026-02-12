'use client';

import { useTodos } from '@/hooks/useTodos';
import { TodoForm } from './TodoForm';
import { TodoColumn } from './TodoColumn';
import { TodoStats } from './TodoStats';
import { ErrorMessage } from './ErrorMessage';
import type { TodoFormData } from '@/types/todo';

export default function TodoList() {
  const {
    loading,
    error,
    editingTodo,
    activeTodos,
    completedTodos,
    stats,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    startEditing,
    cancelEditing,
    setEditingTodo,
  } = useTodos();

  const handleUpdateEditingTodo = (updates: Partial<TodoFormData>) => {
    if (editingTodo) {
      setEditingTodo({ ...editingTodo, ...updates });
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTodo) return;

    await updateTodo(editingTodo.id, {
      title: editingTodo.title,
      description: editingTodo.description,
      completed: editingTodo.completed,
      startDate: editingTodo.startDate,
      deadline: editingTodo.deadline,
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;
    await deleteTodo(id);
  };

  return (
    <div className="content-wrapper">
      <h1 className="page-title">Todo List</h1>

      <ErrorMessage message={error} />

      <TodoForm onSubmit={createTodo} loading={loading} />

      <div className="two-column-grid">
        <TodoColumn
          title="Active Tasks"
          count={activeTodos.length}
          todos={activeTodos}
          emptyMessage="No active tasks. Add one above!"
          editingTodo={editingTodo}
          loading={loading}
          onToggleComplete={toggleComplete}
          onStartEdit={startEditing}
          onDelete={handleDelete}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={cancelEditing}
          onUpdateEditingTodo={handleUpdateEditingTodo}
        />

        <TodoColumn
          title="Completed Tasks"
          count={completedTodos.length}
          todos={completedTodos}
          emptyMessage="No completed tasks yet."
          editingTodo={editingTodo}
          loading={loading}
          onToggleComplete={toggleComplete}
          onStartEdit={startEditing}
          onDelete={handleDelete}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={cancelEditing}
          onUpdateEditingTodo={handleUpdateEditingTodo}
        />
      </div>

      <TodoStats total={stats.total} completed={stats.completed} active={stats.active} />
    </div>
  );
}
