import React,{useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  let Navigate = useNavigate();
  const [clickedButton, setClickedButton] = useState(null); // State to track clicked button
  const handleLogout = () => {
    localStorage.removeItem('token');
    Navigate('/login');
  };

  let location = useLocation();

  const handleButtonClick = (buttonName) => {
    setClickedButton(buttonName); // Set state when a button is clicked
  };

  return (
    <div>
      <nav className="bg-gray-300 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link className="text-2xl font-bold" to="/">NoteVault</Link>
            <Link className={`text-blue-700 ml-4 ${location.pathname === '/' ? 'border-b-2 border-blue-500' : ''}`} aria-current="page" to="/">Home</Link>
            <Link className={`text-blue-700 ml-4 ${location.pathname === '/about' ? 'border-b-2 border-blue-500' : ''}`} to="/about">About</Link>
          </div>
          <button className="block lg:hidden">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <div className="hidden lg:flex lg:items-center lg:w-auto" id="navbarSupportedContent">
            {localStorage.getItem('token') === null ? (
              <form className='flex lg:ml-4'>
                <Link className={`btn btn-outline-primary mx-1 ${clickedButton === 'login' ? 'bg-blue-500 text-white' : ''}`} to="/login" role="button" onClick={() => handleButtonClick('login')}>Login</Link>
                <Link className={`btn btn-outline-primary mx-1 ${clickedButton === 'signup' ? 'bg-blue-500 text-white' : ''}`} to="/signup" role="button" onClick={() => handleButtonClick('signup')}>Signup</Link>
              </form>
            ) : (
              <button onClick={handleLogout} className="btn btn-outline-primary mx-1">Logout</button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
