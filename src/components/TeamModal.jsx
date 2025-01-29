import React from 'react';

export default function TeamModal({ team, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">×</button>
        <div className="container">
          <h2 className="team-title">{team.title}</h2>
          <div className="team-icon">{team.icon}</div>
          <p className="team-description">{team.description}</p>
          <ul className="team-tasks">
            {team.tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}