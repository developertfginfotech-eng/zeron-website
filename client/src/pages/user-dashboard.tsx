import { useEffect } from 'react';

const UserDashboard = () => {
  useEffect(() => {
    // Redirect to zeron-investor dashboard
    window.location.href = "http://13.50.13.193:5002/"
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600">Redirecting to Investor Dashboard...</p>
      </div>
    </div>
  );
};

export default UserDashboard;
