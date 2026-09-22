import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/public/Landing';
import SignUp from '../pages/auth/SignUp';
import SignIn from '../pages/auth/SignIn';

// Customer Pages
import UserDashboard from '../pages/user/Dashboard';
import SearchWorkers from '../pages/user/SearchWorkers';
import AIRecommendations from '../pages/user/AIRecommendations';
import CreateRequest from '../pages/user/CreateRequest';
import BookingDetails from '../pages/user/BookingDetails';
import LiveTracking from '../pages/user/LiveTracking';
import UserNotifications from '../pages/user/Notifications';
import Bills from '../pages/user/Bills';
import Ratings from '../pages/user/Ratings';
import UserHistory from '../pages/user/History';
import SavedWorkers from '../pages/user/SavedWorkers';
import Complaints from '../pages/user/Complaints';
import Profile from '../pages/user/Profile';

// Worker Pages
import WorkerDashboard from '../pages/worker/Dashboard';
import WorkerVerification from '../pages/worker/Verification';
import WorkerJobs from '../pages/worker/Jobs';
import WorkerJobDetails from '../pages/worker/JobDetails';
import WorkerNavigation from '../pages/worker/LiveNavigation';
import WorkerEarnings from '../pages/worker/Earnings';
import WorkerAvailability from '../pages/worker/Availability';
import WorkerReviews from '../pages/worker/Reviews';
import WorkerDocuments from '../pages/worker/Documents';
import WorkerProfile from '../pages/worker/Profile';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />

      {/* Role-protected Customer routes */}
      <Route 
        path="/user/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <UserDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/user/workers" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <SearchWorkers />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/user/ai-match" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <AIRecommendations />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/user/request" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CreateRequest />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/user/booking/:id" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <BookingDetails />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/user/tracking/:id" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <LiveTracking />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/user/notifications" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <UserNotifications />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/user/bills/:id" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <Bills />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/user/rating/:bookingId" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <Ratings />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/user/history" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <UserHistory />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/user/saved-workers" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <SavedWorkers />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/user/support" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <Complaints />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/user/profile" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <Profile />
          </ProtectedRoute>
        } 
      />

      {/* Role-protected Worker routes */}
      <Route 
        path="/worker/verification" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerVerification />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/worker/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/worker/jobs" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerJobs />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/worker/jobs/:id" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerJobDetails />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/worker/navigation/:id" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerNavigation />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/worker/earnings" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerEarnings />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/worker/availability" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerAvailability />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/worker/reviews" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerReviews />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/worker/documents" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerDocuments />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/worker/profile" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerProfile />
          </ProtectedRoute>
        } 
      />

      {/* Role-protected Admin routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/workers/verification" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/users" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/services" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/bookings" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/complaints" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/analytics" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
