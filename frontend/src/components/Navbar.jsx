import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../store/authStore';
import { Wallet, LogOut, PlusCircle, List, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md shadow-sm border-b border-base-200 sticky top-0 z-50 px-4 md:px-8">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold flex items-center gap-2 text-primary hover:bg-primary/10">
          <Wallet className="w-6 h-6" />
          <span className="hidden sm:inline">SpendSync</span>
        </Link>
      </div>
      <div className="flex-none gap-2">
        {user ? (
          <>
            <Link to="/expenses" className="btn btn-ghost btn-sm flex gap-2">
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Transactions</span>
            </Link>
            <Link to="/add" className="btn btn-ghost btn-sm flex gap-2">
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </Link>
            <div className="dropdown dropdown-end ml-2">
              <label tabIndex={0} className="btn btn-ghost btn-circle border border-primary/20 hover:border-primary bg-primary/10 text-primary">
                <div className="flex h-full w-full items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200">
                <li className="menu-title px-4 py-2">
                  <span className="text-base-content font-semibold">{user.username}</span>
                  <span className="text-xs text-base-content/60">{user.email}</span>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <button onClick={handleLogout} className="text-error hover:bg-error/10 hover:text-error">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;