import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UsersContext';
import Toast from '../components/Toast';
import './AddUser.css';

/**
 * AddUser component - form to add a new user to the system
 */
const AddUser = () => {
  const navigate = useNavigate();
  const { addUser } = useUsers();
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [errors, setErrors] = useState({});

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone format (basic)
  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone format (at least 10 digits)';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Add user to context (which handles localStorage)
      addUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
      });

      // Show success toast
      setShowToast(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
      });

      // Navigate to home after brief delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="add-user-page">
      <button className="btn btn-secondary back-btn" onClick={handleBack}>
        ← Back to Home
      </button>

      <div className="add-user-card">
        <div className="form-header">
          <div className="form-icon">👤</div>
          <h1>Add New User</h1>
          <p className="subtitle">Let's get to know this amazing person! Fill in their details below.</p>
        </div>

        <form onSubmit={handleSubmit} className="add-user-form">
          <div className="form-group">
            <label htmlFor="name">
              👤 Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="John Doe"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              ✉️ Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="john@example.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              📞 Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
              placeholder="123-456-7890"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="company">
              🏢 Company Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={errors.company ? 'error' : ''}
              placeholder="Acme Corporation"
            />
            {errors.company && (
              <span className="error-text">{errors.company}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary submit-btn">
            ✨ Add User
          </button>
        </form>
      </div>

      {showToast && (
        <Toast
          message="🎉 User added successfully! Redirecting..."
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default AddUser;
