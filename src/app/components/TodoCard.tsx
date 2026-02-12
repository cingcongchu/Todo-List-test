'use client';

import type { Todo, TodoFormData } from '@/types/todo';
import { formatDate } from '@/lib/utils';

interface TodoCardProps {
  todo: Todo;
  isEditing: boolean;
  editingTodo: TodoFormData | null;
  onToggleComplete: (todo: Todo) => void;
  onStartEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onSaveEdit: (e: React.FormEvent) => void;
  onCancelEdit: () => void;
  onUpdateEditingTodo: (updates: Partial<TodoFormData>) => void;
  loading: boolean;
}

export function TodoCard({
  todo,
  isEditing,
  editingTodo,
  onToggleComplete,
  onStartEdit,
  onDelete,
  onSaveEdit,
  onCancelEdit,
  onUpdateEditingTodo,
  loading,
}: TodoCardProps) {
  if (isEditing && editingTodo) {
    return (
      <div className="card-compact">
        <form onSubmit={onSaveEdit} className="edit-form-stack">
          <input
            type="text"
            value={editingTodo.title}
            onChange={(e) => onUpdateEditingTodo({ title: e.target.value })}
            className="form-input"
            required
          />
          <textarea
            value={editingTodo.description || ''}
            onChange={(e) => onUpdateEditingTodo({ description: e.target.value })}
            className="form-input h-20 resize-none"
          />
          <div className="edit-form-grid">
            <DateInput
              label="Start Date"
              value={editingTodo.startDate || ''}
              onChange={(value) => onUpdateEditingTodo({ startDate: value })}
            />
            <DateInput
              label="Deadline"
              value={editingTodo.deadline || ''}
              onChange={(value) => onUpdateEditingTodo({ deadline: value })}
            />
          </div>
          <div className="button-group">
            <button type="submit" disabled={loading} className="btn-success">
              Save
            </button>
            <button type="button" onClick={onCancelEdit} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="card-compact">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={todo.completed ? 'todo-title-completed' : 'todo-title'}>
            {todo.title}
          </h3>

          {todo.description && (
            <p className={todo.completed ? 'todo-description-completed' : 'todo-description'}>
              {todo.description}
            </p>
          )}

          <TodoDates
            startDate={todo.startDate}
            deadline={todo.deadline}
            completed={todo.completed}
          />

          <p className="todo-date-created">Created: {formatDate(todo.createdAt)}</p>
        </div>

        <TodoActions
          todo={todo}
          onToggleComplete={onToggleComplete}
          onStartEdit={onStartEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

function DateInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string | null) => void;
}) {
  return (
    <div>
      <label className="form-label mb-1">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value || null)}
        className="form-input"
      />
    </div>
  );
}

function TodoDates({
  startDate,
  deadline,
  completed,
}: {
  startDate: string | null;
  deadline: string | null;
  completed: boolean;
}) {
  return (
    <div className="date-info-stack">
      {startDate && (
        <p className={`todo-date-start ${completed ? 'line-through' : ''}`}>
          📅 Start: {formatDate(startDate)}
        </p>
      )}
      {deadline && (
        <p className={`todo-date-deadline ${completed ? 'line-through' : ''}`}>
          ⏰ Deadline: {formatDate(deadline)}
        </p>
      )}
    </div>
  );
}

function TodoActions({
  todo,
  onToggleComplete,
  onStartEdit,
  onDelete,
}: {
  todo: Todo;
  onToggleComplete: (todo: Todo) => void;
  onStartEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="action-buttons">
      <button
        onClick={() => onToggleComplete(todo)}
        className={todo.completed ? 'btn-incomplete' : 'btn-complete'}
        title={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed ? '↩' : '✓'}
      </button>
      <button onClick={() => onStartEdit(todo)} className="btn-edit" title="Edit">
        ✎
      </button>
      <button onClick={() => onDelete(todo.id)} className="btn-delete" title="Delete">
        ✕
      </button>
    </div>
  );
}
