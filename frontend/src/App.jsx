import { Route, Routes, Navigate } from "react-router";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import ExpenseList from "./pages/ExpenseList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/authStore";
import "./index.css";
import { Toaster } from "react-hot-toast";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Auth Route wrapper (redirects to home if already logged in)
const AuthRoute = ({ children }) => {
  const { user } = useAuthStore();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  return (
    <div data-theme="luxury" className="min-h-screen bg-base-100 text-base-content font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Routes>
          <Route path="/login" element={
            <AuthRoute><Login /></AuthRoute>
          } />
          <Route path="/register" element={
            <AuthRoute><Register /></AuthRoute>
          } />
          
          <Route path="/" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/add" element={
            <ProtectedRoute><AddExpense /></ProtectedRoute>
          } />
          <Route path="/expenses" element={
            <ProtectedRoute><ExpenseList /></ProtectedRoute>
          } />
        </Routes>
      </main>

      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'bg-base-200 text-base-content border border-base-300 shadow-xl',
          duration: 3000,
        }}
      />
    </div>
  );
};

export default App;