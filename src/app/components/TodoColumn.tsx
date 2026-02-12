/**
 * TodoColumn Component
 * Displays a column of todos (active or completed)
 */

import type { Todo, TodoFormData } from '@/types/todo';
import { TodoCard } from './TodoCard';

interface TodoColumnProps {
  title: string;
  count: number;
  todos: Todo[];
  emptyMessage: string;
  editingTodo: TodoFormData | null;
  loading: boolean;
  onToggleComplete: (todo: Todo) => void;
  onStartEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onSaveEdit: (e: React.FormEvent) => void;
  onCancelEdit: () => void;
  onUpdateEditingTodo: (updates: Partial<TodoFormData>) => void;
}

export function TodoColumn({
  title,
  count,
  todos,
  emptyMessage,
  editingTodo,
  loading,
  onToggleComplete,
  onStartEdit,
  onDelete,
  onSaveEdit,
  onCancelEdit,
  onUpdateEditingTodo,
}: TodoColumnProps) {
  return (
    <div>
      <h2 className="section-title">
        <span className="count-badge">{count}</span>
        {title}
      </h2>

      <div className="todo-list-stack">
        {todos.length === 0 ? (
          <p className="empty-state">{emptyMessage}</p>
        ) : (
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              isEditing={editingTodo?.id === todo.id}
              editingTodo={editingTodo}
              onToggleComplete={onToggleComplete}
              onStartEdit={onStartEdit}
              onDelete={onDelete}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
              onUpdateEditingTodo={onUpdateEditingTodo}
              loading={loading}
            />
          ))
        )}
      </div>
    </div>
  );
}
