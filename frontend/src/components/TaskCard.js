import React from 'react';
import { CheckCircle2, Circle, Trash2, Calendar, Tag } from 'lucide-react';

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition">
      <div className="flex items-start gap-3">
        <button onClick={() => onToggle(task.id)} className="mt-1">
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-slate-400" />
          )}
        </button>

        <div className="flex-1">
          <p className={`font-medium ${task.completed ? 'line-through text-slate-400' : 'text-white'}`}>
            {task.title}
          </p>

          <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {task.dueDate}
              </div>
            )}

            {task.tags && task.tags.length > 0 && (
              <div className="flex gap-1">
                {task.tags.map(tag => (
                  <span key={tag} className="bg-slate-600 px-2 py-0.5 rounded flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
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
