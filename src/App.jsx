import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UsersProvider } from './context/UsersContext';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import HomePage from './pages/HomePage';
import UserDetails from './pages/UserDetails';
import AddUser from './pages/AddUser';
import './App.css';

/**
 * Main App component with routing and global state provider
 */
function App() {
  return (
    <ThemeProvider>
      <Router>
        <UsersProvider>
          <div className="app">
          <header className="app-header">
            <nav className="nav-container">
              <Link to="/" className="logo">
                👥 User Management Dashboard
              </Link>
              <div className="nav-links">
                <Link to="/" className="nav-link">
                  🏠 Home
                </Link>
                <Link to="/add-user" className="nav-link nav-link-primary">
                  ➕ Add User
                </Link>
                <ThemeToggle />
              </div>
            </nav>
          </header>

          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user/:id" element={<UserDetails />} />
              <Route path="/add-user" element={<AddUser />} />
            </Routes>
          </main>

          <footer className="app-footer">
            <p>Made with love - User Management Dashboard 2025</p>
          </footer>
          </div>
        </UsersProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
