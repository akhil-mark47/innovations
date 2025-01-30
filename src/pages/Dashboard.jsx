import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import * as XLSX from 'xlsx';
import './Dashboard.css';

export default function Dashboard() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState('all');
  const [user, setUser] = useState(null);

  useEffect(() => {
    getVolunteers();
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const getVolunteers = async () => {
    try {
      const { data, error } = await supabase
        .from('volunteers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setVolunteers(data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const exportToExcel = () => {
    const filteredVolunteers = selectedRole === 'all'
      ? volunteers
      : volunteers.filter(v => v.role === selectedRole);

    const worksheet = XLSX.utils.json_to_sheet(filteredVolunteers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Volunteers");
    XLSX.writeFile(workbook, "volunteers.xlsx");
  };

  const filteredVolunteers = selectedRole === 'all'
    ? volunteers
    : volunteers.filter(v => v.role === selectedRole);

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Volunteer Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="sign-out-button"
          >
            Sign Out
          </button>
        </div>

        <div className="dashboard-filters">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="role-select"
          >
            <option value="all">All Roles</option>
            <option value="Creative Team">Creative Team</option>
            <option value="Logistics & Operations Team">Operations Team</option>
            <option value="Coordination Team">Coordination & Communication Team</option>
            <option value="Marketing Team">Marketing Team</option>
            <option value="Content Team">Content & Engagement Team</option>
            <option value="Tech Support Team">Tech Support Team</option>
          </select>
          <button
            onClick={exportToExcel}
            className="export-button"
          >
            Export to Excel
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-container">
            <table className="volunteers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Branch</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Tasks</th>
                </tr>
              </thead>
              <tbody>
                {filteredVolunteers.map((volunteer) => (
                  <tr key={volunteer.id}>
                    <td>{volunteer.name}</td>
                    <td>{volunteer.rollno}</td>
                    <td>{volunteer.branch}</td>
                    <td>{volunteer.email}</td>
                    <td>{volunteer.phone}</td>
                    <td>{volunteer.role}</td>
                    <td>
                      <ul>
                        {volunteer.selected_tasks.map((task, index) => (
                          <li key={index}>{task}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}