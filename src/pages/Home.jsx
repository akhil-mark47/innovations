import { useState } from 'react';
import TeamGrid from '../components/TeamGrid';
import VolunteerForm from '../components/VolunteerForm';
import TeamModal from '../components/TeamModal';
import { teams } from '../data/teams';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  const handleCloseModal = () => {
    setSelectedTeam(null);
  };

  return (
    <div className="min-h-screen">
      <section className="hero bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Be A Changemaker</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Join us in making a difference at our upcoming innovation event
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300"
          >
            Volunteer Now
          </button>
        </div>
      </section>

      <TeamGrid teams={teams} onTeamClick={handleTeamClick} />

      {showForm && (
        <VolunteerForm 
          teams={teams} 
          onClose={() => setShowForm(false)}
        />
      )}

      {selectedTeam && (
        <TeamModal 
          team={selectedTeam} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}