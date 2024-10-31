import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [click, setClick] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !click) {
      alert('Please fill in all fields and accept the terms and conditions.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_CLIENT_SIDE}/adminregister`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem('person', JSON.stringify(data));
        alert('Welcome! You are successfully registered as Admin');
        navigate('/');
        setName('');
        setEmail('');
        setPassword('');
        setClick(false);
      } else {
        alert('Signup failed. Please check your details and try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup. Please try again later.');
    }
  };

  return (
    <>
      <div style={{ marginLeft: '2rem' }}>
        <div className="font-[sans-serif] bg-white md:h-screen">
          <div className="grid md:grid-cols-2 items-center gap-8 h-full">
            <div className="max-md:order-1 p-4">
              <img
                src="https://readymadeui.com/signin-image.webp"
                className="lg:max-w-[85%] w-full h-full object-contain block mx-auto"
                alt="login-image"
              />
            </div>
            <div className="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto" style={{ marginTop: '-9rem' }}>
              <form className="max-w-lg w-full mx-auto" onSubmit={handleSubmit}>
                <div className="mb-12">
                  <h3 className="text-3xl font-bold" style={{ color: 'black' }}>
                    Create an account as Admin
                  </h3>
                </div>
                <div>
                  <label className="text-white text-xs block mb-2">Full Name</label>
                  <div className="relative flex items-center">
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ color: 'black' }}
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <label className="text-white text-xs block mb-2">Email</label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ color: 'black' }}
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <label className="text-white text-xs block mb-2">Password</label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type="password"
                      required
                      className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ color: 'black' }}
                    />
                  </div>
                </div>
                <div className="flex items-center mt-8">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 rounded"
                    checked={click}
                    onChange={() => setClick(!click)}
                  />
                  <label htmlFor="terms" className="ml-3 text-sm" style={{ color: 'black' }}>
                    I accept the
                    <a href="#terms" className="text-yellow-500 font-semibold hover:underline ml-1">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                <div className="mt-12">
                  <button
                    type="submit"
                    className="w-max shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
                    style={{ marginTop: '0.5rem' }}
                  >
                    Register
                  </button>
                  <p className="text-sm text-black mt-8">
                    Already have an account?{' '}
                    <a
                      href="/adminlogin"
                      className="text-yellow-400 font-semibold hover:underline ml-1"
                    >
                      Login here
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminRegister;
