import React, { useState, useCallback } from 'react';
import { useUsers } from '../context/UsersContext';
import UserCard from '../components/UserCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import './HomePage.css';

/**
 * HomePage component - displays list of users with search functionality
 */
const HomePage = () => {
  const { users, loading, error } = useUsers();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on search query (name or email)
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  // Memoize search callback to prevent unnecessary re-renders
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>👋 Welcome to Your User Directory</h1>
        <p className="subtitle">Discover and connect with amazing people in our community</p>
      </div>

      <div className="search-section">
        <SearchBar
          onSearch={handleSearch}
          placeholder="🔍 Search by name or email..."
        />
        {searchQuery && (
          <p className="search-results-text">
            Found {filteredUsers.length} {filteredUsers.length === 1 ? 'person' : 'people'} matching "{searchQuery}"
          </p>
        )}
      </div>

      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h2>No users found</h2>
          <p>We couldn't find anyone matching your search. Try different keywords!</p>
        </div>
      ) : (
        <>
          <div className="users-count">
            <p>Showing {filteredUsers.length} wonderful {filteredUsers.length === 1 ? 'person' : 'people'} 🎉</p>
          </div>
          <div className="users-grid">
            {filteredUsers.map((user, index) => (
              <div key={user.id} style={{ animationDelay: `${index * 0.05}s` }}>
                <UserCard user={user} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
