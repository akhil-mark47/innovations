import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Navbar({ session }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="flex justify-between h-16">
          <div className="items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Innovations
            </Link>
          </div>
          <div className="items-center space-x-4">
            {/* <Link to="/volunteer" className="text-gray-600 hover:text-gray-900">
              Volunteer
            </Link> */}
            {session ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}