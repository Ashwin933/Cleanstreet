import React, { useState } from 'react';
import ComplaintList from '../../components/ComplaintList';
import AdminDashboardNavbar from '../../components/AdminDashboardNavbar';
import { useAuth } from '../../context/AuthContext';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';
import AdminFeedbackList from '../../components/AdminFeedbackList/AdminFeedbackList';


const AdminDashboard = () => {
  const { user, isLoading, isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return <p>Loading dashboard...</p>;
  }

  if (!user) {
    return <p>Please log in to view your dashboard.</p>;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminDashboardNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-text-primary mb-6">Admin Dashboard</h1>
        
        {/* Welcome Message */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
              <Icon name="User" size={24} className="mr-2" />
              Profile Information
            </h2>
            <p className="text-text-secondary mb-2"><strong>Name:</strong> {user.name}</p>
            <p className="text-text-secondary"><strong>Email:</strong> {user.email}</p>
          </div>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search complaints by location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon="Search"
          />
        </div>

        {/* All Complaints Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
            <Icon name="List" size={24} className="mr-2" />
            All Complaints
          </h2>
          <p className="text-text-secondary mb-4">Overview of all reported issues in the system.</p>
          <ComplaintList isAdmin={isAdmin} searchQuery={searchQuery} />
        </div>

           <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
              <Icon name="Map" size={24} className="mr-2" />
              User Feedback
            </h2>
            <p className="text-text-secondary mb-4">View all feedback submitted by users.</p>
            {<AdminFeedbackList /> }
          </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 