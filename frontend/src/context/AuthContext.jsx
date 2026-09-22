import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('coop_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      role: userData.role, // customer, worker, admin
      // Workers are registered as 'pending' initially. Customers and Admins are active.
      status: userData.role === 'worker' ? 'pending' : 'approved',
      verified: userData.role === 'customer'
    };

    setUser(newUser);
    localStorage.setItem('coop_user', JSON.stringify(newUser));
    return newUser;
  };

  const signin = async (email, role, workerStatus = 'approved') => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    // Check if this worker was approved by admin
    const approvedList = JSON.parse(localStorage.getItem('approved_workers') || '[]');
    const isApprovedByAdmin = approvedList.includes(email.toLowerCase().trim());
    
    const loggedUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email,
      role: role || 'customer',
      status: role === 'worker' ? (isApprovedByAdmin ? 'approved' : workerStatus) : 'approved',
      verified: true
    };
    
    setUser(loggedUser);
    localStorage.setItem('coop_user', JSON.stringify(loggedUser));
    return loggedUser;
  };
  
  const approveWorkerSimulated = () => {
    if (user && user.role === 'worker') {
      const updatedUser = { ...user, status: 'approved' };
      setUser(updatedUser);
      localStorage.setItem('coop_user', JSON.stringify(updatedUser));
      
      const approvedList = JSON.parse(localStorage.getItem('approved_workers') || '[]');
      if (!approvedList.includes(user.email.toLowerCase().trim())) {
        approvedList.push(user.email.toLowerCase().trim());
        localStorage.setItem('approved_workers', JSON.stringify(approvedList));
      }
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem('coop_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, signin, signout, approveWorkerSimulated, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
