import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById } from '../services/api';
import { useUsers } from '../context/UsersContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './UserDetails.css';

/**
 * UserDetails component - displays detailed information about a specific user
 */
const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { localUsers } = useUsers();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if user is in local users first
        const localUser = localUsers.find((u) => u.id === parseInt(id));

        if (localUser) {
          setUser(localUser);
        } else {
          // Fetch from API
          const fetchedUser = await fetchUserById(id);
          setUser(fetchedUser);
        }
      } catch (err) {
        setError('Failed to load user details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, localUsers]);

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return <LoadingSpinner message="Loading user details..." />;
  }

  if (error || !user) {
    return (
      <div className="user-details-page">
        <div className="error-container">
          <div className="error-icon">😔</div>
          <h2>Oops! Something went wrong</h2>
          <p className="error-message">
            {error || "We couldn't find this user"}
          </p>
          <button className="btn btn-primary" onClick={handleBack}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-details-page">
      <button className="btn btn-secondary back-btn" onClick={handleBack}>
        ← Back to Home
      </button>

      <div className="user-details-card">
        <div className="user-header">
          <div className="user-avatar-large">
            {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
          <div className="user-header-text">
            <h1>{user.name}</h1>
            <p className="username">@{user.username || 'user'}</p>
          </div>
        </div>

        <div className="details-section">
          <h2>📬 Contact Information</h2>
          <div className="detail-item">
            <span className="detail-icon">✉️</span>
            <div>
              <strong>Email</strong>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📞</span>
            <div>
              <strong>Phone</strong>
              <p>{user.phone}</p>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">🌐</span>
            <div>
              <strong>Website</strong>
              <p>
                {user.website ? (
                  <a
                    href={`http://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website}
                  </a>
                ) : (
                  'Not available'
                )}
              </p>
            </div>
          </div>
        </div>

        {user.address && (
          <div className="details-section">
            <h2>📍 Address</h2>
            <div className="detail-item">
              <span className="detail-icon">🏠</span>
              <div>
                <strong>Street</strong>
                <p>{user.address.street || 'N/A'} {user.address.suite || ''}</p>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🏙️</span>
              <div>
                <strong>City</strong>
                <p>{user.address.city || 'N/A'}</p>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📮</span>
              <div>
                <strong>Zipcode</strong>
                <p>{user.address.zipcode || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        <div className="details-section">
          <h2>🏢 Company</h2>
          <div className="detail-item">
            <span className="detail-icon">🏛️</span>
            <div>
              <strong>Name</strong>
              <p>{user.company?.name || user.company || 'N/A'}</p>
            </div>
          </div>
          {user.company?.catchPhrase && (
            <div className="detail-item">
              <span className="detail-icon">💡</span>
              <div>
                <strong>Catchphrase</strong>
                <p>{user.company.catchPhrase}</p>
              </div>
            </div>
          )}
          {user.company?.bs && (
            <div className="detail-item">
              <span className="detail-icon">💼</span>
              <div>
                <strong>Business</strong>
                <p>{user.company.bs}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
