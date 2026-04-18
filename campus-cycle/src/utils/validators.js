// Validation utilities for CampusCycle forms

/**
 * Email validation
 * @param {string} email - Email to validate
 * @returns {Object} { isValid: boolean, message: string }
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { isValid: false, message: 'Email is required' };
  }

  // Basic email regex - can be enhanced for more strict validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }

  // Check for college email pattern (optional enhancement)
  // const collegeEmailRegex = /^[^\s@]+@([^\s@]+\.)?[^\s@]+\.(edu|ac\.in|college|university)$/;
  // if (!collegeEmailRegex.test(email)) {
  //   return { isValid: false, message: 'Please use your college email address' };
  // }

  return { isValid: true, message: '' };
};

/**
 * Password validation with strength requirements
 * @param {string} password - Password to validate
 * @returns {Object} { isValid: boolean, message: string, strength: string }
 */
export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return { isValid: false, message: 'Password is required', strength: 'Weak' };
  }

  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  let strength = 'Weak';
  let score = 0;

  if (password.length >= minLength) score++;
  if (hasUpperCase) score++;
  if (hasLowerCase) score++;
  if (hasNumbers) score++;
  if (hasSpecialChar) score++;

  if (score >= 4) strength = 'Strong';
  else if (score >= 3) strength = 'Medium';

  if (password.length < minLength) {
    return {
      isValid: false,
      message: `Password must be at least ${minLength} characters long`,
      strength
    };
  }

  if (!hasUpperCase || !hasLowerCase) {
    return {
      isValid: false,
      message: 'Password must contain both uppercase and lowercase letters',
      strength
    };
  }

  if (!hasNumbers) {
    return {
      isValid: false,
      message: 'Password must contain at least one number',
      strength
    };
  }

  if (!hasSpecialChar) {
    return {
      isValid: false,
      message: 'Password must contain at least one special character',
      strength
    };
  }

  return { isValid: true, message: '', strength };
};

/**
 * Confirm password validation
 * @param {string} password - Original password
 * @param {string} confirmPassword - Password confirmation
 * @returns {Object} { isValid: boolean, message: string }
 */
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return { isValid: false, message: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }

  return { isValid: true, message: '' };
};

/**
 * Phone number validation (Indian phone numbers)
 * @param {string} phone - Phone number to validate
 * @returns {Object} { isValid: boolean, message: string }
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return { isValid: false, message: 'Phone number is required' };
  }

  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');

  // Check for valid Indian mobile number patterns
  // 10 digits starting with 6-9 (mobile numbers)
  const mobileRegex = /^[6-9]\d{9}$/;

  // 11 digits starting with 0 (landline with area code)
  const landlineRegex = /^0\d{10}$/;

  // International format with +91
  const internationalRegex = /^91[6-9]\d{9}$/;

  if (mobileRegex.test(cleanPhone)) {
    return { isValid: true, message: '' };
  }

  if (landlineRegex.test(cleanPhone)) {
    return { isValid: true, message: '' };
  }

  if (internationalRegex.test(cleanPhone)) {
    return { isValid: true, message: '' };
  }

  return {
    isValid: false,
    message: 'Please enter a valid Indian phone number (10 digits starting with 6-9, or with +91)'
  };
};

/**
 * Required field validation
 * @param {string} value - Value to check
 * @param {string} fieldName - Name of the field for error message
 * @returns {Object} { isValid: boolean, message: string }
 */
export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return { isValid: false, message: `${fieldName} is required` };
  }
  return { isValid: true, message: '' };
};

/**
 * Validate entire form data
 * @param {Object} formData - Form data object
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateSignupForm = (formData) => {
  const errors = {};
  let isValid = true;

  // Step 1 validations
  const fullNameValidation = validateRequired(formData.fullName, 'Full Name');
  if (!fullNameValidation.isValid) {
    errors.fullName = fullNameValidation.message;
    isValid = false;
  }

  const collegeValidation = validateRequired(formData.collegeName, 'College Name');
  if (!collegeValidation.isValid) {
    errors.collegeName = collegeValidation.message;
    isValid = false;
  }

  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
    isValid = false;
  }

  const phoneValidation = validatePhone(formData.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.message;
    isValid = false;
  }

  // Step 2 validations (password)
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
    isValid = false;
  }

  const confirmPasswordValidation = validateConfirmPassword(formData.password, formData.confirmPassword);
  if (!confirmPasswordValidation.isValid) {
    errors.confirmPassword = confirmPasswordValidation.message;
    isValid = false;
  }

  return { isValid, errors };
};