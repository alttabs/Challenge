import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './../styles/SignupForm.css';

const WarnIcon = ({ showRequirements, unmetRequirements, togglePasswordVisibility   }) => {
  return (
    <span className="warn-icon" onClick={togglePasswordVisibility}>
      {showRequirements && (
        <i className="fas fa-triangle-exclamation"></i> 
      )}
      {showRequirements && (
        <span className="tooltip"> 
          {unmetRequirements.map((requirement, index) => (
            <span key={index} className="tooltip-item">
              <i className="fa fa-circle-check"></i> {requirement}
            </span>
          ))}
        </span>
      )}
    </span>
  );
};

const PasswordInput = ({ handleBlur}) => {
  const [password, setPassword] = useState('');
  const [showRequirements, setShowRequirements] = useState(false);
  const [unmetRequirements, setUnmetRequirements] = useState([]);
  const [showPassword, setShowPassword] = useState(false);


  const validatePassword = (password) => {
    const requirements = [];

    if (password.length < 8) {
      requirements.push('Minimum 8 characters');
    }
    if (!/\d/.test(password)) {
      requirements.push('One digit (0-9)');
    }
    if (!/[A-Z]/.test(password)) {
      requirements.push('One uppercase letter (A-Z)');
    }
    setUnmetRequirements(requirements);
    setShowRequirements(requirements.length > 0); 
    return requirements.length === 0;
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validatePassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label htmlFor="password" className='form-label'>Password:</label>
      <div className="password-input-container">
      <Field
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handlePasswordChange}
        onBlur={handleBlur}
        className="password-input" 
      />
      <WarnIcon showRequirements={showRequirements} unmetRequirements={unmetRequirements} togglePasswordVisibility={togglePasswordVisibility}/>
      </div>
    </div>
  );
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .max(120, 'First Name cannot exceed 120 characters'),
  lastName: Yup.string()
    .required('Last Name is required')
    .max(120, 'Last Name cannot exceed 120 characters'),
  company: Yup.string()
    .required('Company is required')
    .max(120, 'Company cannot exceed 120 characters'),
  workEmail: Yup.string()
    .required('Work Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one lowercase, one uppercase, one number, and one special character'),
});

const SignupForm = () => {
  return (
    <div className="signup-form">
      <h2 className="title">Nice to meet you!</h2>
      <p className="subtitle">We're excited to have you aboard!</p>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          company: '',
          jobTitle: '',
          workEmail: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <div className='row'>
              <div className='col-md-6 mb-3'>
              <label htmlFor="firstName" className='form-label'>First Name:</label>
              <Field
                id="firstName"
                name="firstName"
                type="text"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && touched.firstName && (
                <div className="error">{errors.firstName}</div>
              )}
              </div>
              <div className='col-md-6 mb-3'>
              <label htmlFor="lastName" className='form-label'>Last Name:</label>
              <Field
                id="lastName"
                name="lastName"
                type="text"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && touched.lastName && (
                <div className="error">{errors.lastName}</div>
              )}
              </div>
            </div>

            <div>
              <label htmlFor="company" className='form-label'>Company:</label>
              <Field
                id="company"
                name="company"
                type="text"
                value={values.company}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.company && touched.company && (
                <div className="error">{errors.company}</div>
              )}
            </div>

            <div>
              <label htmlFor="jobTitle" className='form-label'>Job Title:</label>
              <Field
                id="jobTitle"
                name="jobTitle"
                type="text"
                value={values.jobTitle}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div>
              <label htmlFor="workEmail" >Work Email:</label>
              <Field
                id="workEmail"
                name="workEmail"
                type="email"
                value={values.workEmail}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.workEmail && touched.workEmail && (
                <div className="error">{errors.workEmail}</div>
              )}
            </div>

            <PasswordInput
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
            />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
