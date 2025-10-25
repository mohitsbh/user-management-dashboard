import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserCard.css';

/**
 * UserCard component - displays individual user information in a card format
 * @param {Object} user - User object containing id, name, email, phone, company
 */
const UserCard = ({ user }) => {
  const navigate = useNavigate();

  // Generate consistent avatar color based on user name
  const getAvatarColor = (name) => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleClick = () => {
    navigate(`/user/${user.id}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };

  return (
    <div 
      className="user-card" 
      onClick={handleClick} 
      onKeyPress={handleKeyPress}
      role="button" 
      tabIndex={0}
    >
      <div className="user-card-avatar" style={{ background: getAvatarColor(user.name) }}>
        {getInitials(user.name)}
      </div>
      <div className="user-card-content">
        <h3>{user.name}</h3>
        <p className="user-card-email">
          <span className="icon">✉️</span> {user.email}
        </p>
        <p className="user-card-phone">
          <span className="icon">📞</span> {user.phone}
        </p>
        <p className="user-card-company">
          <span className="icon">🏢</span> {user.company?.name || user.company || 'N/A'}
        </p>
      </div>
      <div className="user-card-arrow">→</div>
    </div>
  );
};

export default UserCard;
