import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';

const SignupForm = (props) => {

  const updateMessage = props.updateMessage
  const handleSignupOrLogin = props.handleSignupOrLogin
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
  });

  const handleChange = (e) => {
    updateMessage('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(formData);
      handleSignupOrLogin();
       navigate('/profile');
      console.log("made it past login")
    } catch (err) {
       updateMessage(err.message);
    }
  };

  const { username, email, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && email && password && password === passwordConf);
  };

  const handleClearForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      passwordConf: '',
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white/80 p-8 rounded-md shadow-md md:w-96 w-full mt-[-80px]">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="text-gray-500 text-sm">
              Name
            </label>
            <input
              type="text"
              autoComplete="off"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
              className="border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-500 text-sm">
              Email
            </label>
            <input
              type="text"
              autoComplete="off"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
              className="border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-gray-500 text-sm">
              Password
            </label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              className="border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm" className="text-gray-500 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              autoComplete="off"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              className="border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <button
              disabled={isFormInvalid()}
              className="text-white bg-gray-500 px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300 w-full md:w-auto"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleClearForm}
              className="text-gray-500 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300 w-full md:w-auto mt-2 md:mt-0"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;



