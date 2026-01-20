import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, Sparkles, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import AIInfo from '../components/AIInfo';
import { tasksAPI } from '../api/tasks';
import { fetchAISuggestions } from '../api/aiSuggestions';

export default function TasksPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [aiSuggestions, setAISuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAI, setShowAI] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'TODO',
    assigned_user_id: null,
    due_date: ''
  });

  // Mock users list - you can fetch this from your API
  const [users] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' }
  ]);

  useEffect(() => {
    loadTasks();
    loadAISuggestions();
  }, [projectId]);

  const loadTasks = async () => {
    try {
      const data = await tasksAPI.getAll(projectId);
      setTasks(data);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadAISuggestions = async () => {
    try {
      const data = await fetchAISuggestions(projectId);
      setAISuggestions(data.suggestions || []);
    } catch (err) {
      console.error('Failed to load AI suggestions:', err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      const taskPayload = {
        project_id: parseInt(projectId),  // Add project_id from URL
        title: newTask.title,
        description: newTask.description || null,
        status: newTask.status,
        assigned_user_id: newTask.assigned_user_id ? parseInt(newTask.assigned_user_id) : null,
        due_date: newTask.due_date || null
      };

      const createdTask = await tasksAPI.create(projectId, taskPayload);

      setTasks([...tasks, createdTask]);
      setNewTask({
        title: '',
        description: '',
        status: 'TODO',
        assigned_user_id: null,
        due_date: ''
      });
      setShowModal(false);
    } catch (err) {
      console.error('Failed to create task:', err);
      alert('Failed to create task. Please try again.');
    }
  };

  const handleToggleTask = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      const newStatus = task.status === 'DONE' ? 'TODO' : 'DONE';
      await tasksAPI.update(projectId, taskId, {
        ...task,
        status: newStatus,
        completed: newStatus === 'DONE'
      });

      setTasks(tasks.map(t =>
        t.id === taskId ? { ...t, status: newStatus, completed: newStatus === 'DONE' } : t
      ));
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await tasksAPI.delete(projectId, taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setNewTask({
      title: '',
      description: '',
      status: 'TODO',
      assigned_user_id: null,
      due_date: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/projects')}
              className="text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white">Tasks</h2>
              <p className="text-slate-400 mt-1">
                {tasks.filter(t => t.completed || t.status === 'DONE').length} of {tasks.length} completed
              </p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Task List</h3>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add Task
                </button>
              </div>

              <div className="space-y-2">
                {tasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>

              {tasks.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-400">No tasks yet. Create your first one!</p>
                </div>
              )}
            </div>
          </div>

          {showAI && (
            <div className="lg:col-span-1">
              <AIInfo suggestions={aiSuggestions} />
            </div>
          )}
        </div>
      </div>

      {/* Create Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl w-full max-w-2xl border border-slate-700 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Create New Task</h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6">
              <form onSubmit={handleAddTask} className="space-y-5">
                {/* Task Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Task Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Implement user authentication"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Add more details about this task..."
                    rows={4}
                  />
                </div>

                {/* Status and Assignee Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Status
                    </label>
                    <select
                      value={newTask.status}
                      onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="TODO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="DONE">Done</option>
                    </select>
                  </div>

                  {/* Assign to User */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Assign To
                    </label>
                    <select
                      value={newTask.assigned_user_id || ''}
                      onChange={(e) => setNewTask({...newTask, assigned_user_id: e.target.value || null})}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Unassigned</option>
                      {users.map(user => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTask.due_date}
                    onChange={(e) => setNewTask({...newTask, due_date: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition font-medium"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}