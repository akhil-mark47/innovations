import React from 'react';

export default function TeamGrid({ teams, onTeamClick }) {
  return (
    <div className="team-grid-container">
      <div className="team-grid">
        {teams.map((team) => (
          <div key={team.title} className="team-card" onClick={() => onTeamClick(team)}>
            <div className="team-icon">{team.icon}</div>
            <h3 className="team-title">{team.title}</h3>
            <p className="team-description">{team.description}</p>
            <ul className="team-tasks">
              {team.tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}