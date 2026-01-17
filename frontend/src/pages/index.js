import React, { useState } from 'react';
import { Plus, Brain, CheckCircle2, Circle, Trash2, Calendar, Tag, Sparkles } from 'lucide-react';

export default function SmartTaskAssistant() {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Backend API', color: 'bg-blue-500' },
    { id: 2, name: 'AI Integration', color: 'bg-purple-500' }
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      projectId: 1,
      title: 'Setup JWT authentication',
      completed: true,
      dueDate: '2024-01-15',
      tags: ['backend', 'security']
    },
    {
      id: 2,
      projectId: 1,
      title: 'Build CRUD endpoints',
      completed: true,
      dueDate: '2024-01-16',
      tags: ['backend', 'api']
    },
    {
      id: 3,
      projectId: 2,
      title: 'Integrate OpenAI API',
      completed: false,
      dueDate: '2024-01-18',
      tags: ['ai', 'integration']
    }
  ]);

  const [aiSuggestions] = useState([
    { id: 1, text: 'Consider adding rate limiting to your API endpoints', type: 'security' },
    { id: 2, text: 'Break down "Integrate OpenAI API" into smaller subtasks', type: 'productivity' },
    { id: 3, text: 'Add error handling for async queue failures', type: 'improvement' }
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAI, setShowAI] = useState(false);

  const filteredTasks = selectedProject
    ? tasks.filter(t => t.projectId === selectedProject)
    : tasks;

  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      projectId: selectedProject || 1,
      title: newTaskTitle,
      completed: false,
      dueDate: new Date().toISOString().split('T')[0],
      tags: []
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Smart Task Assistant</h1>
              <p className="text-xs text-slate-400">AI-Powered Task Management</p>
            </div>
          </div>

          <button
            onClick={() => setShowAI(!showAI)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              showAI
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            AI Suggestions
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Projects */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-400" />
                Projects
              </h2>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    selectedProject === null
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full"></div>
                    <span>All Tasks</span>
                    <span className="ml-auto text-xs bg-slate-600 px-2 py-1 rounded">
                      {tasks.length}
                    </span>
                  </div>
                </button>

                {projects.map(project => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition ${
                      selectedProject === project.id
                        ? 'bg-slate-700 text-white'
                        : 'text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 ${project.color} rounded-full`}></div>
                      <span>{project.name}</span>
                      <span className="ml-auto text-xs bg-slate-600 px-2 py-1 rounded">
                        {tasks.filter(t => t.projectId === project.id).length}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Completed</span>
                    <span className="font-semibold text-green-400">
                      {tasks.filter(t => t.completed).length}/{tasks.length}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                      style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Tasks */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h2 className="text-lg font-semibold mb-4">
                {selectedProject
                  ? projects.find(p => p.id === selectedProject)?.name
                  : 'All Tasks'}
              </h2>

              {/* Add Task Input */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  placeholder="Add a new task..."
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addTask}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {/* Task List */}
              <div className="space-y-2">
                {filteredTasks.map(task => (
                  <div
                    key={task.id}
                    className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="mt-1"
                      >
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
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {task.dueDate}
                          </div>

                          <div className="flex gap-1">
                            {task.tags.map(tag => (
                              <span key={tag} className="bg-slate-600 px-2 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-slate-400 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Suggestions Panel */}
            {showAI && (
              <div className="mt-6 bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl p-6 border border-purple-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  AI Suggestions
                </h3>

                <div className="space-y-3">
                  {aiSuggestions.map(suggestion => (
                    <div key={suggestion.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-200">{suggestion.text}</p>
                          <span className="inline-block mt-2 text-xs bg-purple-600/30 text-purple-300 px-2 py-1 rounded">
                            {suggestion.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}