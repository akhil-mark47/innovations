import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function VolunteerForm({ teams, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    rollno: '',
    branch: '',
    email: '',
    phone: '',
    role: '',
    tasks: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('volunteers')
        .insert([{
          name: formData.name,
          rollno: formData.rollno,
          branch: formData.branch,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          selected_tasks: formData.tasks // Ensure the correct field name
        }]);

      if (error) throw error;
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskChange = (task) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.includes(task)
        ? prev.tasks.filter(t => t !== task)
        : [...prev.tasks, task]
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button 
          onClick={onClose}
          className="close-button"
        >
          ×
        </button>
        <div className="container">
          <h2>Volunteer Registration</h2>
          {success ? (
            <div className="text-green-600 text-center py-4">
              Registration successful! Thank you for volunteering.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="volunteer-form">
              {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded">
                  {error}
                </div>
              )}

              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Roll Number *</label>
                <input
                  type="text"
                  required
                  value={formData.rollno}
                  onChange={e => setFormData({...formData, rollno: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Branch *</label>
                <input
                  type="text"
                  required
                  value={formData.branch}
                  onChange={e => setFormData({...formData, branch: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Role *</label>
                <select
                  required
                  value={formData.role}
                  onChange={e => {
                    setFormData({
                      ...formData,
                      role: e.target.value,
                      tasks: []
                    });
                  }}
                >
                  <option value="">Select a role</option>
                  {teams.map(team => (
                    <option key={team.title} value={team.title}>
                      {team.title}
                    </option>
                  ))}
                </select>
              </div>

              {formData.role && (
                <div className="form-group tasks-container">
                  <label>Tasks *</label>
                  {teams
                    .find(t => t.title === formData.role)
                    ?.tasks.map(task => (
                      <label key={task} className="task-checkbox">
                        <input
                          type="checkbox"
                          checked={formData.tasks.includes(task)}
                          onChange={() => handleTaskChange(task)}
                        />
                        {task}
                      </label>
                    ))}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}