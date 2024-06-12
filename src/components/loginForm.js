import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './../styles/LoginForm.css';

const LoginForm = ({ setUser }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <div className="login-form">
      <h2 className="title">Login</h2>
      <p className="subtitle">Welcome Back!</p>
      <Formik
        initialValues={{
          workEmail: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          workEmail: Yup.string()
            .required('Work Email is required')
            .email('Invalid email format'),
          password: Yup.string()
            .required('Password is required'),
        })}
        onSubmit={async (values) => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_USERS_URL}/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ workEmail: values.workEmail, password: values.password })
            });
            if (response.ok) {
              const data = await response.json();
              console.log('Login successful!');
              localStorage.setItem('token', data.token);
              setUser(data.user);
              navigate('/home');
            } else {
              const errorData = await response.json();
              console.error('Login error:', errorData.message);
              setErrorMessage(errorData.message);
            }
          } catch (error) {
            console.error('Login error:', error);
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <div>
              <label htmlFor="workEmail">Work Email:</label>
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

            <div>
              <label htmlFor="password">Password:</label>
              <Field
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            {errorMessage && <div className="error">{errorMessage}</div>}
            <button type="submit">Login</button>
            <button type="button" className='signup-link' onClick={() => navigate('/signup')}>Signup</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
