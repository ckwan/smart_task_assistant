import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Folder, Trash2 } from 'lucide-react';

export default function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projects/${project.id}/tasks`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Delete this project?')) {
      onDelete(project.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 cursor-pointer transition group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${project.color || 'bg-blue-500'} rounded-lg flex items-center justify-center`}>
            <Folder className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{project.name}</h3>
            <p className="text-sm text-slate-400">{project.taskCount || 0} tasks</p>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}