'use client';

import { useState } from 'react';
import type { CreateTodoInput } from '@/types/todo';

interface TodoFormProps {
  onSubmit: (data: CreateTodoInput) => Promise<void>;
  loading: boolean;
}

export function TodoForm({ onSubmit, loading }: TodoFormProps) {
  const [formData, setFormData] = useState<CreateTodoInput>({
    title: '',
    description: '',
    startDate: null,
    deadline: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    await onSubmit({
      title: formData.title,
      description: formData.description || undefined,
      startDate: formData.startDate || undefined,
      deadline: formData.deadline || undefined,
    });

    setFormData({
      title: '',
      description: '',
      startDate: null,
      deadline: null,
    });
  };

  const handleChange = (field: keyof CreateTodoInput, value: string | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isSubmitDisabled = loading || !formData.title.trim();

  return (
    <form onSubmit={handleSubmit} className="card mb-8">
      <h2 className="form-title">Add New Todo</h2>

      <div className="form-stack">
        <input
          type="text"
          placeholder="Todo title..."
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="form-input-bold"
          required
        />

        <textarea
          placeholder="Description (optional)..."
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          className="form-textarea"
        />

        <div className="form-grid">
          <div>
            <label className="form-label">Start Date</label>
            <input
              type="date"
              value={formData.startDate || ''}
              onChange={(e) => handleChange('startDate', e.target.value || null)}
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Deadline</label>
            <input
              type="date"
              value={formData.deadline || ''}
              onChange={(e) => handleChange('deadline', e.target.value || null)}
              className="form-input"
            />
          </div>
        </div>

        <button type="submit" disabled={isSubmitDisabled} className="btn-primary">
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
      </div>
    </form>
  );
}
