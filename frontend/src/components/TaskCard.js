import React from 'react';
import { CheckCircle2, Circle, Trash2, Calendar, User } from 'lucide-react';

export default function TaskCard({ task, onToggle, onDelete }) {
  const statusColors = {
    TODO: 'bg-slate-600 text-slate-200',
    IN_PROGRESS: 'bg-blue-600 text-blue-100',
    DONE: 'bg-green-600 text-green-100'
  };

  const statusLabels = {
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done'
  };

  const isCompleted = task.completed || task.status === 'DONE';

  return (
    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition">
      <div className="flex items-start gap-3">
        <button onClick={() => onToggle(task.id)} className="mt-1">
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-slate-400" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p className={`font-medium ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
            {task.title}
          </p>

          {task.description && (
            <p className="text-sm text-slate-400 mt-2 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
            {task.status && (
              <span className={`px-2 py-1 rounded font-medium ${statusColors[task.status] || statusColors.TODO}`}>
                {statusLabels[task.status] || task.status}
              </span>
            )}

            {task.assigned_user && (
              <div className="flex items-center gap-1 text-slate-400 bg-slate-600 px-2 py-1 rounded">
                <User className="w-3 h-3" />
                {task.assigned_user.name || `User #${task.assigned_user_id}`}
              </div>
            )}

            {task.due_date && (
              <div className="flex items-center gap-1 text-slate-400">
                <Calendar className="w-3 h-3" />
                {task.due_date}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="text-slate-400 hover:text-red-400 transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
