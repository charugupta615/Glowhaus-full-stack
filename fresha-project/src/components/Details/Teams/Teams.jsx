import React, { useState } from 'react';
import { Button, Tag } from 'antd';
import { StarFilled } from '@ant-design/icons';
import './Teams.css';

const Teams = ({ teamData }) => {
  const [showAll, setShowAll] = useState(false);

  // Guard clause: no team, render nothing
  if (!Array.isArray(teamData) || teamData.length === 0) {
    return null;
  }

  const visibleTeam = showAll ? teamData : teamData.slice(0, 4);

  return (
    <div className="content-container">
      <div className="team-list">
        <h2 className="team-heading">Team</h2>
        <div className="team-members">
          {visibleTeam.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-content">
                <div className="image-container">
                  <img
                    src={member.photo ? `https://glowhaus-full-stack.onrender.com/uploads/${member.photo}` : 'path/to/fallback/image.jpg'}
                    alt={member.team_name}
                    className="team-image"
                  />
                  <Tag icon={<StarFilled />} color="blue" className="rating-tag">
                    {member.rating}
                  </Tag>
                </div>
                <div className="info-container">
                  <h3 className="member-heading">{member.team_name}</h3>
                  <p className="team-para">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {teamData.length > 4 && (
          <Button className="see-all-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'View Less' : 'View All'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Teams;
