import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, Clock, ShieldCheck, FileText } from 'lucide-react';

const AdminBookings = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const bookings = [
    { id: 'bk_123', user: 'Ravi', worker: 'Arun Kumar', service: 'Plumbing', location: 'Indiranagar', status: 'Completed', price: 510, date: '25 Aug 2026' },
    { id: 'bk_124', user: 'Priya Sen', worker: 'Marcus Vance', service: 'Electrical', location: 'Karur', status: 'Completed', price: 750, date: '18 Aug 2026' },
    { id: 'bk_125', user: 'Sonia', worker: 'Julius Diaz', service: 'Cleaning', location: 'Karur', status: 'Completed', price: 350, date: '10 Aug 2026' },
    { id: 'bk_126', user: 'Rohan', worker: 'Sunita Patel', service: 'Gardening', location: 'Indiranagar', status: 'Cancelled', price: 400, date: '04 Aug 2026' },
    { id: 'bk_127', user: 'Rohan', worker: 'Jordan Brooks', service: 'Carpentry', location: 'Karur', status: 'Active', price: 600, date: '25 Aug 2026' }
  ];

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.1} threadCount={4} opacity={0.5} />
      </div>

      <div className="relative z-10 w-full max-w-4xl rounded-3xl glassmorphism border-white/5 p-6 md:p-8 shadow-2xl space-y-6 text-left">
        <header className="flex justify-between items-center border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">Monitoring Ledger Bookings</h1>
          </div>
          <Badge variant="primary" className="flex items-center gap-1"><FileText className="w-3.5 h-3.5 font-mono" /> {bookings.length} Bookings</Badge>
        </header>

        {/* Bookings Table */}
        <div className="overflow-x-auto rounded-xl border border-white/5 bg-black/20">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-bold uppercase tracking-wider">
                <th className="p-4">Booking ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Worker Partner</th>
                <th className="p-4">Service</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-white">{item.id}</td>
                  <td className="p-4 text-gray-300">{item.user}</td>
                  <td className="p-4 text-gray-300">{item.worker}</td>
                  <td className="p-4 text-coop-300 font-semibold">{item.service}</td>
                  <td className="p-4 text-gray-300">{item.location}</td>
                  <td className="p-4">
                    <Badge variant={item.status === 'Completed' ? 'success' : item.status === 'Cancelled' ? 'warning' : 'info'}>{item.status}</Badge>
                  </td>
                  <td className="p-4 text-white font-bold">₹{item.price}</td>
                  <td className="p-4 text-right text-gray-500 font-mono font-medium">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
